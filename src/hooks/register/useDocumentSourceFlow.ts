import { useState } from 'react';
import { Linking } from 'react-native';

import { AppError } from '@/domain/auth/errors';
import type { MediaPermissionKind, MediaPicker } from '@/domain/media/MediaPicker';
import type { MediaSource, PickedFile } from '@/domain/media/types';
import type { DocumentKind, DocumentSlot } from '@/domain/registration/types';

/**
 * Pausa breve entre cerrar un Modal y abrir otro: presentar uno mientras
 * el anterior todavía se descarta falla silenciosamente en iOS.
 */
export const MODAL_TRANSITION_MS = 300;

/** Los slots que solo aceptan PDF no necesitan menú: abren el selector directo. */
export function isPdfOnly(slot: DocumentSlot): boolean {
  return slot.accepts.length === 1 && slot.accepts[0] === 'pdf';
}

type PermissionRequest = {
  slot: DocumentSlot;
  permission: MediaPermissionKind;
  blocked: boolean;
};

type UseDocumentSourceFlowParams = {
  mediaPicker: MediaPicker;
  attachDocument: (kind: DocumentKind, file: PickedFile) => void;
};

/**
 * Lógica de selección de fuente (cámara/galería/archivo) y permisos para la
 * carga de documentos KYC: qué slot está eligiendo fuente, el modal
 * explicativo de permisos y los errores al adjuntar.
 */
export function useDocumentSourceFlow({ mediaPicker, attachDocument }: UseDocumentSourceFlowParams) {
  const [activeSlot, setActiveSlot] = useState<DocumentSlot | null>(null);
  const [permissionRequest, setPermissionRequest] = useState<PermissionRequest | null>(null);
  const [pickError, setPickError] = useState<string | null>(null);

  const launchPicker = async (slot: DocumentSlot, source: MediaSource) => {
    try {
      const file =
        source === 'camera'
          ? await mediaPicker.captureWithCamera()
          : source === 'gallery'
            ? await mediaPicker.pickFromGallery()
            : await mediaPicker.pickDocumentFile(slot.accepts);
      if (file) {
        attachDocument(slot.kind, file);
      }
    } catch (error) {
      setPickError(
        error instanceof AppError
          ? error.message
          : 'No pudimos adjuntar el documento. Intenta de nuevo.',
      );
    }
  };

  const handleSource = async (slot: DocumentSlot, source: MediaSource) => {
    setPickError(null);

    // El selector de archivos del sistema no requiere permiso.
    if (source === 'file') {
      void launchPicker(slot, 'file');
      return;
    }

    // Se chequea el permiso EN CADA intento: si el usuario lo revocó desde
    // los ajustes, el modal vuelve a aparecer y se vuelve a solicitar.
    const status = await mediaPicker.checkPermission(source);
    if (status === 'granted') {
      void launchPicker(slot, source);
      return;
    }
    setTimeout(() => {
      setPermissionRequest({ slot, permission: source, blocked: status === 'blocked' });
    }, MODAL_TRANSITION_MS);
  };

  const handleAllowPermission = async () => {
    if (!permissionRequest) {
      return;
    }
    const { slot, permission } = permissionRequest;
    // Recién aquí aparece el diálogo de permisos del sistema.
    const status = await mediaPicker.requestPermission(permission);
    if (status === 'granted') {
      setPermissionRequest(null);
      setTimeout(() => {
        void launchPicker(slot, permission);
      }, MODAL_TRANSITION_MS);
      return;
    }
    if (status === 'blocked') {
      setPermissionRequest({ ...permissionRequest, blocked: true });
      return;
    }
    setPermissionRequest(null);
  };

  const handleOpenSettings = () => {
    setPermissionRequest(null);
    void Linking.openSettings();
  };

  return {
    activeSlot,
    setActiveSlot,
    permissionRequest,
    setPermissionRequest,
    pickError,
    setPickError,
    launchPicker,
    handleSource,
    handleAllowPermission,
    handleOpenSettings,
    isPdfOnly,
  };
}
