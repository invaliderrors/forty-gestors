import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { RegisterWizard } from '@/application/registration/useRegisterWizard';
import { DocumentUploadCard } from '@/components/register/DocumentUploadCard';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { ClayPickerSheet, type PickerOption } from '@/components/shared/clay/ClayPickerSheet';
import { MediaPermissionError } from '@/domain/media/MediaPicker';
import type { MediaSource } from '@/domain/media/types';
import type { DocumentKind, DocumentSlot } from '@/domain/registration/types';
import { documentSlotsFor } from '@/domain/registration/types';
import { useServices } from '@/providers/ServicesProvider';
import { colors, fonts, fontSizes, spacing } from '@/theme';

type DocumentsStepProps = {
  wizard: RegisterWizard;
};

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

/** Paso 3: carga de documentos KYC según el tipo de persona. */
export function DocumentsStep({ wizard }: DocumentsStepProps) {
  const { mediaPicker } = useServices();
  const [activeSlot, setActiveSlot] = useState<DocumentSlot | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const slots = documentSlotsFor(wizard.state.identity.personaType);
  const isNatural = wizard.state.identity.personaType === 'natural';

  const handleSource = async (kind: DocumentKind, source: MediaSource) => {
    setPermissionError(null);
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
      if (error instanceof MediaPermissionError) {
        setPermissionError(error.message);
      } else {
        setPermissionError('No pudimos adjuntar el documento. Intenta de nuevo.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>
        {isNatural
          ? 'Coljuegos exige verificar tu identidad. Sube fotos nítidas y tu RUT actualizado.'
          : 'Coljuegos exige verificar la empresa y su representante legal. Sube los documentos actualizados.'}
      </Text>

      {permissionError ? <ClayNotice tone="error" message={permissionError} /> : null}

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
        message="Tus documentos solo se usan para la verificación ante Coljuegos y el Operador autorizado."
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
