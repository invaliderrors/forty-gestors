import type { DocumentScanner } from '@/domain/documents/DocumentScanner';
import {
  evaluateDocumentText,
  evaluatePdfFile,
  unanalyzableResult,
  type AnalysisContext,
  type DocumentAnalysis,
} from '@/domain/documents/analysis';
import type { PickedFile } from '@/domain/media/types';
import type { DocumentKind, IdentityData } from '@/domain/registration/types';

/**
 * Orquesta la verificación de un documento adjunto: PDFs se validan
 * estructuralmente; imágenes pasan por OCR y por las reglas puras del
 * dominio. Si el dispositivo no puede analizar, no bloquea (se difiere
 * a la revisión del backend).
 */
export async function analyzeDocument(
  scanner: DocumentScanner,
  file: PickedFile,
  context: AnalysisContext,
): Promise<DocumentAnalysis> {
  if (file.kind === 'pdf') {
    return evaluatePdfFile(file, context);
  }

  let text: string | null;
  try {
    text = await scanner.extractText(file);
  } catch {
    text = null;
  }
  if (text === null) {
    return unanalyzableResult();
  }
  return evaluateDocumentText(text, file, context);
}

/** Qué debe verificarse en cada slot, derivado de lo escrito en el paso de identidad. */
export function buildAnalysisContext(kind: DocumentKind, identity: IdentityData): AnalysisContext {
  switch (kind) {
    case 'cedula_front':
      return { kind, expectedNumber: identity.docNumber, docType: identity.docType };
    case 'cedula_back':
      return { kind, docType: identity.docType };
    case 'cedula_rep_front':
      return { kind, expectedNumber: identity.repLegalDocNumber, docType: 'CC' };
    case 'cedula_rep_back':
      return { kind, docType: 'CC' };
    case 'rut':
      // El NIT de una persona natural es su cédula.
      return { kind, expectedNumber: identity.docNumber };
    case 'rut_empresa':
      return { kind, expectedNumber: identity.nit.split('-')[0] };
    case 'cert_representacion':
      return { kind };
  }
}
