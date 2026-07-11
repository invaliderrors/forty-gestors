import { AppError } from '@/domain/auth/errors';
import type { PickedFile } from '@/domain/media/types';

export class MediaPermissionError extends AppError {
  constructor(permission: 'camera' | 'gallery') {
    super(
      'MEDIA/PERMISSION_DENIED',
      permission === 'camera'
        ? 'Necesitamos permiso de cámara para capturar el documento.'
        : 'Necesitamos acceso a tus fotos para adjuntar el documento.',
    );
  }
}

export type MediaPermissionKind = 'camera' | 'gallery';

/**
 * - `granted`: se puede usar ya.
 * - `askable`: aún no concedido, el sistema puede volver a preguntar.
 * - `blocked`: negado permanentemente; solo se habilita desde los ajustes
 *   del teléfono.
 */
export type MediaPermissionStatus = 'granted' | 'askable' | 'blocked';

/**
 * Puerto de captura/selección de archivos. Los métodos de captura resuelven
 * `null` si la persona cancela, y lanzan MediaPermissionError si el permiso
 * está negado. El chequeo/solicitud explícitos permiten mostrar nuestro
 * modal explicativo ANTES del diálogo del sistema.
 */
export type MediaPicker = {
  checkPermission(kind: MediaPermissionKind): Promise<MediaPermissionStatus>;
  requestPermission(kind: MediaPermissionKind): Promise<MediaPermissionStatus>;
  captureWithCamera(): Promise<PickedFile | null>;
  pickFromGallery(): Promise<PickedFile | null>;
  /** El selector de archivos del sistema no requiere permiso. */
  pickDocumentFile(): Promise<PickedFile | null>;
};
