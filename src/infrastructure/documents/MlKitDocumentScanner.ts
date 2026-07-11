import TextRecognition from '@react-native-ml-kit/text-recognition';

import type { DocumentScanner } from '@/domain/documents/DocumentScanner';
import type { PickedFile } from '@/domain/media/types';

/**
 * OCR on-device con Google ML Kit (gratis, offline). Solo imágenes;
 * los PDF resuelven `null` (validación estructural + revisión backend).
 */
export class MlKitDocumentScanner implements DocumentScanner {
  async extractText(file: PickedFile): Promise<string | null> {
    if (file.kind !== 'image') {
      return null;
    }
    const result = await TextRecognition.recognize(file.uri);
    return result.text ?? '';
  }
}
