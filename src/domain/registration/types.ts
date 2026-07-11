import type { PickedFile } from '@/domain/media/types';

export type PersonaType = 'natural' | 'juridica';

/**
 * Documentos de identidad admitidos para persona natural.
 * CC/CE son numéricos; el pasaporte es alfanumérico (misma regla que fortu-app).
 */
export type NaturalDocType = 'CC' | 'CE' | 'PA';

export const NATURAL_DOC_TYPES: readonly { value: NaturalDocType; label: string }[] = [
  { value: 'CC', label: 'Cédula de ciudadanía' },
  { value: 'CE', label: 'Cédula de extranjería' },
  { value: 'PA', label: 'Pasaporte' },
];

export function naturalDocTypeLabel(docType: NaturalDocType): string {
  return NATURAL_DOC_TYPES.find((option) => option.value === docType)?.label ?? '';
}

/** Identificación según el tipo de persona (Decreto 1486 de 2024 / registro Coljuegos). */
export type IdentityData = {
  personaType: PersonaType;
  /** Persona natural */
  docType: NaturalDocType;
  docNumber: string;
  fullName: string;
  /** Persona jurídica */
  nit: string;
  razonSocial: string;
  repLegalName: string;
  repLegalDocNumber: string;
};

export type ContactData = {
  address: string;
  department: string | null;
  city: string;
  phone: string;
  email: string;
};

/**
 * Documentos KYC exigidos por tipo de persona:
 * - Natural: cédula por ambas caras + RUT actualizado.
 * - Jurídica: RUT de la empresa, certificado de existencia y
 *   representación legal (Cámara de Comercio) y cédula del
 *   representante legal por ambas caras.
 */
export type DocumentKind =
  | 'cedula_front'
  | 'cedula_back'
  | 'rut'
  | 'rut_empresa'
  | 'cert_representacion'
  | 'cedula_rep_front'
  | 'cedula_rep_back'
  /** Soporte de propiedad del premio de una rifa (factura del concesionario/constructora). */
  | 'factura_compra';

export type DocumentSlot = {
  kind: DocumentKind;
  title: string;
  hint: string;
  accepts: readonly ('image' | 'pdf')[];
  required: boolean;
};

export type RegistrationDocuments = Partial<Record<DocumentKind, PickedFile>>;

export type RegistrationDraft = {
  identity: IdentityData;
  contact: ContactData;
  documents: RegistrationDocuments;
  password: string;
};

export type RegistrationResult = {
  registrationId: string;
  /** Correo al que se envió el código de verificación. */
  email: string;
  status: 'verification_sent';
};

const NATURAL_SLOTS: readonly DocumentSlot[] = [
  {
    kind: 'cedula_front',
    title: 'Cédula — cara frontal',
    hint: 'Foto nítida, sin reflejos y con los datos legibles.',
    accepts: ['image'],
    required: true,
  },
  {
    kind: 'cedula_back',
    title: 'Cédula — cara posterior',
    hint: 'La cara con el código y la huella.',
    accepts: ['image'],
    required: true,
  },
  {
    kind: 'rut',
    title: 'RUT actualizado',
    hint: 'Solo PDF, tal como lo descargas de la DIAN. No aceptamos fotos.',
    accepts: ['pdf'],
    required: true,
  },
];

const JURIDICA_SLOTS: readonly DocumentSlot[] = [
  {
    kind: 'rut_empresa',
    title: 'RUT de la empresa',
    hint: 'Solo PDF de la DIAN, a nombre de la sociedad. No aceptamos fotos.',
    accepts: ['pdf'],
    required: true,
  },
  {
    kind: 'cert_representacion',
    title: 'Certificado de existencia y representación legal',
    hint: 'Expedido por la Cámara de Comercio, con vigencia no mayor a 30 días.',
    accepts: ['pdf', 'image'],
    required: true,
  },
  {
    kind: 'cedula_rep_front',
    title: 'Cédula del representante — frontal',
    hint: 'Documento de identidad del representante legal.',
    accepts: ['image'],
    required: true,
  },
  {
    kind: 'cedula_rep_back',
    title: 'Cédula del representante — posterior',
    hint: 'La cara con el código y la huella.',
    accepts: ['image'],
    required: true,
  },
];

export function documentSlotsFor(personaType: PersonaType): readonly DocumentSlot[] {
  return personaType === 'natural' ? NATURAL_SLOTS : JURIDICA_SLOTS;
}
