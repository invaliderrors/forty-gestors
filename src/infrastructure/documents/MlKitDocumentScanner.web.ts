import type { DocumentScanner } from '@/domain/documents/DocumentScanner';

/**
 * Variante web: ML Kit es nativo, en web no hay OCR on-device.
 * Devuelve null y la validación se difiere a la revisión del backend.
 */
export class MlKitDocumentScanner implements DocumentScanner {
  async extractText(): Promise<string | null> {
    return null;
  }
}
