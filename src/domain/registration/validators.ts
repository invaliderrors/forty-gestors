import type { NaturalDocType } from '@/domain/registration/types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Celular colombiano: 10 dígitos iniciando en 3. */
const CO_MOBILE_RE = /^3\d{9}$/;
const CC_RE = /^\d{6,10}$/;
const CE_RE = /^\d{5,12}$/;
const NIT_RE = /^\d{9,10}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isValidColombianMobile(value: string): boolean {
  return CO_MOBILE_RE.test(value.trim());
}

export function isValidNaturalDoc(docType: NaturalDocType, value: string): boolean {
  return docType === 'CC' ? CC_RE.test(value.trim()) : CE_RE.test(value.trim());
}

export function isValidFullName(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length >= 5 && trimmed.includes(' ');
}

/**
 * Dígito de verificación del NIT según el algoritmo oficial de la DIAN
 * (pesos primos de derecha a izquierda, módulo 11).
 */
export function computeNitCheckDigit(nitDigits: string): number | null {
  if (!/^\d+$/.test(nitDigits)) {
    return null;
  }
  const WEIGHTS = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
  const digits = nitDigits.split('').reverse();
  if (digits.length > WEIGHTS.length) {
    return null;
  }
  const sum = digits.reduce((acc, digit, index) => acc + Number(digit) * WEIGHTS[index], 0);
  const remainder = sum % 11;
  return remainder > 1 ? 11 - remainder : remainder;
}

/** Acepta "900123456" o "900123456-7" (validando el DV si viene). */
export function isValidNit(value: string): boolean {
  const trimmed = value.trim();
  const [base, dv, extra] = trimmed.split('-');
  if (extra !== undefined || !NIT_RE.test(base)) {
    return false;
  }
  if (dv === undefined || dv === '') {
    return dv === undefined;
  }
  if (!/^\d$/.test(dv)) {
    return false;
  }
  return computeNitCheckDigit(base) === Number(dv);
}

export function isValidPassword(value: string): boolean {
  return value.length >= 8 && /[A-ZÁÉÍÓÚÑ]/.test(value) && /[a-záéíóúñ]/.test(value) && /\d/.test(value);
}

/** Puntaje 0–4 para el medidor de fuerza. */
export function scorePassword(value: string): 0 | 1 | 2 | 3 | 4 {
  if (value.length === 0) {
    return 0;
  }
  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return Math.min(score, 4) as 0 | 1 | 2 | 3 | 4;
}
