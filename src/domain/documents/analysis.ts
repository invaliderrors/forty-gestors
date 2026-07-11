import type { PickedFile } from '@/domain/media/types';
import type { DocumentKind, NaturalDocType } from '@/domain/registration/types';

/**
 * Reglas PURAS de validación de documentos KYC sobre el texto extraído
 * por OCR. Sin I/O ni framework: reciben texto y contexto, devuelven el
 * veredicto. La orquestación (llamar al scanner) vive en application/.
 */

export type DocumentCheck = {
  id: 'resolution' | 'legibility' | 'docType' | 'numberMatch' | 'pdf';
  passed: boolean;
  /** `required` bloquea; `advisory` solo informa. */
  severity: 'required' | 'advisory';
};

export type DocumentAnalysis =
  | { status: 'analyzing' }
  | { status: 'approved'; checks: DocumentCheck[]; note?: string }
  | { status: 'rejected'; checks: DocumentCheck[]; reason: string };

/** Un documento adjunto junto con el estado de su verificación. */
export type DocumentAttachment = {
  file: PickedFile;
  analysis: DocumentAnalysis;
};

export type AnalysisContext = {
  kind: DocumentKind;
  /** Número que debería aparecer en el documento (cédula, NIT), si aplica. */
  expectedNumber?: string;
  /** Tipo de documento de identidad, para las caras de cédula/pasaporte. */
  docType?: NaturalDocType;
};

/** Diacríticos combinantes que NFD separa de la letra base. */
const DIACRITICS_RE = new RegExp('[\\u0300-\\u036f]', 'g');

/** Mayúsculas, sin acentos, espacios colapsados — base de toda comparación. */
export function normalizeOcrText(value: string): string {
  return value
    .toUpperCase()
    .normalize('NFD')
    .replace(DIACRITICS_RE, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function digitsOf(value: string): string {
  return value.replace(/\D/g, '');
}

function alphanumericOf(value: string): string {
  return value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
}

/** Palabras/frases que identifican cada tipo de documento (texto normalizado). */
function keywordsFor(context: AnalysisContext): readonly string[] {
  switch (context.kind) {
    case 'cedula_front':
    case 'cedula_rep_front': {
      const docType = context.kind === 'cedula_rep_front' ? 'CC' : (context.docType ?? 'CC');
      if (docType === 'CE') {
        return ['CEDULA DE EXTRANJERIA', 'EXTRANJERIA', 'MIGRACION COLOMBIA', 'MIGRACION'];
      }
      if (docType === 'PA') {
        return ['PASAPORTE', 'PASSPORT'];
      }
      return [
        'CEDULA DE CIUDADANIA',
        'REPUBLICA DE COLOMBIA',
        'IDENTIFICACION PERSONAL',
        'NUIP',
        'CEDULA',
      ];
    }
    case 'cedula_back':
    case 'cedula_rep_back':
      return [
        'REGISTRADOR',
        'REGISTRADURIA',
        'EXPEDICION',
        'NACIMIENTO',
        'ESTATURA',
        'ICCOL',
        'INDICE DERECHO',
        'FECHA Y LUGAR',
        'G.S. RH',
        'RH',
      ];
    case 'rut':
    case 'rut_empresa':
      return [
        'REGISTRO UNICO TRIBUTARIO',
        'DIRECCION DE IMPUESTOS',
        'DIAN',
        'FORMULARIO DEL REGISTRO',
        'NIT',
      ];
    case 'cert_representacion':
      return [
        'CAMARA DE COMERCIO',
        'CERTIFICADO DE EXISTENCIA',
        'REPRESENTACION LEGAL',
        'MATRICULA MERCANTIL',
        'REPRESENTANTE LEGAL',
      ];
  }
}

/** Mínimo de caracteres alfanuméricos legibles por tipo (fotos con menos texto real). */
function minLegibleCharsFor(kind: DocumentKind): number {
  switch (kind) {
    case 'cedula_back':
    case 'cedula_rep_back':
      return 25;
    case 'cedula_front':
    case 'cedula_rep_front':
      return 40;
    default:
      return 60;
  }
}

/** ¿El chequeo de número aplica, y con qué severidad? */
function numberSeverityFor(context: AnalysisContext): 'required' | 'advisory' | null {
  if (!context.expectedNumber || context.expectedNumber.trim().length === 0) {
    return null;
  }
  switch (context.kind) {
    case 'cedula_front':
    case 'cedula_rep_front':
      // El OCR del pasaporte es menos confiable → no bloquea.
      return context.docType === 'PA' && context.kind === 'cedula_front'
        ? 'advisory'
        : 'required';
    case 'rut':
    case 'rut_empresa':
      return 'advisory';
    default:
      return null;
  }
}

function rejectionReasonFor(checkId: DocumentCheck['id'], context: AnalysisContext): string {
  switch (checkId) {
    case 'resolution':
      return 'La imagen es muy pequeña. Toma la foto de nuevo o sube una de mayor calidad.';
    case 'legibility':
      return 'No pudimos leer el documento. Toma la foto de nuevo con buena luz, sin reflejos y con el documento completo en el encuadre.';
    case 'docType': {
      switch (context.kind) {
        case 'cedula_front':
        case 'cedula_rep_front':
          return 'La imagen no parece la cara frontal del documento. Verifica y súbela de nuevo.';
        case 'cedula_back':
        case 'cedula_rep_back':
          return 'La imagen no parece la cara posterior del documento. Verifica y súbela de nuevo.';
        case 'rut':
        case 'rut_empresa':
          return 'La imagen no parece un RUT de la DIAN. Verifica y súbela de nuevo.';
        case 'cert_representacion':
          return 'La imagen no parece un certificado de Cámara de Comercio. Verifica y súbela de nuevo.';
      }
      break;
    }
    case 'numberMatch':
      return 'El número del documento en la foto no coincide con el que escribiste. Revisa la foto o corrige el número en el paso anterior.';
    case 'pdf':
      return 'El archivo PDF parece estar vacío o dañado. Súbelo de nuevo.';
  }
  return 'El documento no pasó la verificación. Súbelo de nuevo.';
}

const MIN_IMAGE_SHORT_SIDE_PX = 400;
const MIN_PDF_BYTES = 5 * 1024;
const MAX_PDF_BYTES = 15 * 1024 * 1024;

function buildVerdict(checks: DocumentCheck[], context: AnalysisContext): DocumentAnalysis {
  const failedRequired = checks.find((check) => check.severity === 'required' && !check.passed);
  if (failedRequired) {
    return {
      status: 'rejected',
      checks,
      reason: rejectionReasonFor(failedRequired.id, context),
    };
  }
  const failedAdvisory = checks.some((check) => check.severity === 'advisory' && !check.passed);
  return {
    status: 'approved',
    checks,
    note: failedAdvisory
      ? 'Algunos datos no se pudieron confirmar automáticamente; se revisarán durante la verificación de tu cuenta.'
      : undefined,
  };
}

/** Valida una IMAGEN a partir del texto OCR. Pura: texto + contexto → veredicto. */
export function evaluateDocumentText(
  rawText: string,
  file: PickedFile,
  context: AnalysisContext,
): DocumentAnalysis {
  const checks: DocumentCheck[] = [];
  const text = normalizeOcrText(rawText);

  if (file.width !== undefined && file.height !== undefined) {
    checks.push({
      id: 'resolution',
      severity: 'required',
      passed: Math.min(file.width, file.height) >= MIN_IMAGE_SHORT_SIDE_PX,
    });
  }

  const legibleChars = alphanumericOf(text).length;
  checks.push({
    id: 'legibility',
    severity: 'required',
    passed: legibleChars >= minLegibleCharsFor(context.kind),
  });

  const keywords = keywordsFor(context);
  checks.push({
    id: 'docType',
    severity: 'required',
    passed: keywords.some((keyword) => text.includes(keyword)),
  });

  const numberSeverity = numberSeverityFor(context);
  if (numberSeverity && context.expectedNumber) {
    const isPassport = context.docType === 'PA' && context.kind === 'cedula_front';
    const passed = isPassport
      ? alphanumericOf(text).includes(alphanumericOf(context.expectedNumber))
      : digitsOf(text).includes(digitsOf(context.expectedNumber));
    checks.push({ id: 'numberMatch', severity: numberSeverity, passed });
  }

  return buildVerdict(checks, context);
}

/**
 * Valida un PDF de forma estructural (tamaño plausible). El contenido de
 * un PDF no se puede OCRear en el dispositivo: su validación profunda es
 * parte de la revisión del backend.
 */
export function evaluatePdfFile(file: PickedFile, context: AnalysisContext): DocumentAnalysis {
  const sizeOk =
    file.sizeBytes === undefined ||
    (file.sizeBytes >= MIN_PDF_BYTES && file.sizeBytes <= MAX_PDF_BYTES);
  const checks: DocumentCheck[] = [{ id: 'pdf', severity: 'required', passed: sizeOk }];
  const verdict = buildVerdict(checks, context);
  if (verdict.status === 'approved') {
    return {
      ...verdict,
      note: 'PDF adjuntado. Su contenido se validará durante la revisión de tu solicitud.',
    };
  }
  return verdict;
}

/** Cuando el dispositivo no puede analizar (sin OCR): no bloquea, se difiere a la revisión. */
export function unanalyzableResult(): DocumentAnalysis {
  return {
    status: 'approved',
    checks: [],
    note: 'No pudimos analizar la imagen automáticamente en este dispositivo; se validará durante la revisión de tu solicitud.',
  };
}
