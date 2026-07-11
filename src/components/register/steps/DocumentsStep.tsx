import { useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

import type { RegisterWizard } from '@/application/registration/useRegisterWizard';
import { DocumentUploadCard } from '@/components/register/DocumentUploadCard';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { ClayPickerSheet, type PickerOption } from '@/components/shared/clay/ClayPickerSheet';
import { ClayPermissionModal } from '@/components/shared/ClayPermissionModal';
import { MediaPermissionError, type MediaPermissionKind } from '@/domain/media/MediaPicker';
import type { MediaSource } from '@/domain/media/types';
import type { DocumentKind, DocumentSlot } from '@/domain/registration/types';
import { documentSlotsFor } from '@/domain/registration/types';
import { useServices } from '@/providers/ServicesProvider';
import { colors, fonts, fontSizes, spacing } from '@/theme';

/**
 * Pausa breve entre cerrar un Modal y abrir otro: presentar uno mientras
 * el anterior todavía se descarta falla silenciosamente en iOS.
 */
const MODAL_TRANSITION_MS = 300;

function sourceOptionsFor(slot: DocumentSlot): PickerOption<MediaSource>[] {
  const options: PickerOption<MediaSource>[] = [
    {
      value: 'camera',
      label: 'Tomar foto',
      description: 'Captura el documento con la cámara.',
      icon: 'camera-outline',
    },
    {
      value: 'gallery',
      label: 'Elegir de la galería',
      description: 'Usa una foto que ya tengas.',
      icon: 'images-outline',
    },
  ];
  if (slot.accepts.includes('pdf')) {
    options.push({
      value: 'file',
      label: 'Subir archivo',
      description: 'PDF o imagen desde tus archivos.',
      icon: 'document-attach-outline',
    });
  }
  return options;
}

type PermissionRequest = {
  kind: DocumentKind;
  permission: MediaPermissionKind;
  blocked: boolean;
};

type DocumentsStepProps = {
  wizard: RegisterWizard;
};

/** Paso 3: carga de documentos KYC según el tipo de persona. */
export function DocumentsStep({ wizard }: DocumentsStepProps) {
  const { mediaPicker } = useServices();
  const [activeSlot, setActiveSlot] = useState<DocumentSlot | null>(null);
  const [permissionRequest, setPermissionRequest] = useState<PermissionRequest | null>(null);
  const [pickError, setPickError] = useState<string | null>(null);

  const slots = documentSlotsFor(wizard.state.identity.personaType);
  const isNatural = wizard.state.identity.personaType === 'natural';

  const launchPicker = async (kind: DocumentKind, source: MediaSource) => {
    try {
      const file =
        source === 'camera'
          ? await mediaPicker.captureWithCamera()
          : source === 'gallery'
            ? await mediaPicker.pickFromGallery()
            : await mediaPicker.pickDocumentFile();
      if (file) {
        wizard.setDocument(kind, file);
      }
    } catch (error) {
      setPickError(
        error instanceof MediaPermissionError
          ? error.message
          : 'No pudimos adjuntar el documento. Intenta de nuevo.',
      );
    }
  };

  const handleSource = async (kind: DocumentKind, source: MediaSource) => {
    setPickError(null);

    // El selector de archivos del sistema no requiere permiso.
    if (source === 'file') {
      void launchPicker(kind, 'file');
      return;
    }

    // Se chequea el permiso EN CADA intento: si el usuario lo revocó desde
    // los ajustes, el modal vuelve a aparecer y se vuelve a solicitar.
    const status = await mediaPicker.checkPermission(source);
    if (status === 'granted') {
      void launchPicker(kind, source);
      return;
    }
    setTimeout(() => {
      setPermissionRequest({ kind, permission: source, blocked: status === 'blocked' });
    }, MODAL_TRANSITION_MS);
  };

  const handleAllowPermission = async () => {
    if (!permissionRequest) {
      return;
    }
    const { kind, permission } = permissionRequest;
    // Recién aquí aparece el diálogo de permisos del sistema.
    const status = await mediaPicker.requestPermission(permission);
    if (status === 'granted') {
      setPermissionRequest(null);
      setTimeout(() => {
        void launchPicker(kind, permission);
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

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>
        {isNatural
          ? 'Necesitamos verificar tu identidad. Sube fotos nítidas y tu RUT actualizado.'
          : 'Necesitamos verificar la empresa y su representante legal. Sube los documentos actualizados.'}
      </Text>

      {pickError ? <ClayNotice tone="error" message={pickError} /> : null}

      {slots.map((slot) => (
        <DocumentUploadCard
          key={slot.kind}
          slot={slot}
          file={wizard.state.documents[slot.kind] ?? null}
          error={wizard.visibleErrors[slot.kind]}
          onPick={() => setActiveSlot(slot)}
          onRemove={() => wizard.removeDocument(slot.kind)}
        />
      ))}

      <ClayNotice
        tone="info"
        message="Tus documentos solo se usan para la verificación de tu cuenta."
      />

      <ClayPickerSheet
        visible={activeSlot !== null}
        title={activeSlot?.title ?? ''}
        options={activeSlot ? sourceOptionsFor(activeSlot) : []}
        onSelect={(source) => {
          if (activeSlot) {
            void handleSource(activeSlot.kind, source);
          }
        }}
        onClose={() => setActiveSlot(null)}
      />

      <ClayPermissionModal
        visible={permissionRequest !== null}
        kind={permissionRequest?.permission ?? 'camera'}
        blocked={permissionRequest?.blocked ?? false}
        onAllow={() => void handleAllowPermission()}
        onOpenSettings={handleOpenSettings}
        onDismiss={() => setPermissionRequest(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  intro: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 21,
    color: colors.textSecondary,
  },
});
