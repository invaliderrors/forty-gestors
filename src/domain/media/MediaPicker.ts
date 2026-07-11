import { AppError } from '@/domain/auth/errors';
import type { PickedFile } from '@/domain/media/types';

export class MediaPermissionError extends AppError {
  constructor(permission: 'camera' | 'gallery') {
    super(
      'MEDIA/PERMISSION_DENIED',
      permission === 'camera'
        ? 'Necesitamos permiso de cámara para capturar el documento. Habilítalo en los ajustes del teléfono.'
        : 'Necesitamos acceso a tus fotos para adjuntar el documento. Habilítalo en los ajustes del teléfono.',
    );
  }
}

/**
 * Puerto de captura/selección de archivos. Cada método resuelve `null`
 * si la persona cancela, y lanza MediaPermissionError si negó el permiso.
 */
export type MediaPicker = {
  captureWithCamera(): Promise<PickedFile | null>;
  pickFromGallery(): Promise<PickedFile | null>;
  pickDocumentFile(): Promise<PickedFile | null>;
};
