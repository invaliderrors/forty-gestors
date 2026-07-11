import type { PickedFile } from '@/domain/media/types';

/**
 * Puerto de extracción de texto de un documento (OCR).
 * - Resuelve el texto reconocido para imágenes.
 * - Resuelve `null` cuando el archivo no se puede analizar en el
 *   dispositivo (PDFs, plataformas sin OCR): en ese caso la validación
 *   profunda queda a cargo de la revisión del backend.
 *
 * Implementación actual: ML Kit on-device. La verificación de
 * autenticidad (registraduría, proveedor KYC) se conectará por el
 * backend más adelante — este puerto no cambia.
 */
export type DocumentScanner = {
  extractText(file: PickedFile): Promise<string | null>;
};
