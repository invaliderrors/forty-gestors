import { Text, View } from 'react-native';

import type { RegisterWizard } from '@/application/registration/useRegisterWizard';
import { DocumentUploadCard } from '@/components/register/DocumentUploadCard';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { ClayPickerSheet, type PickerOption } from '@/components/shared/clay/ClayPickerSheet';
import { ClayPermissionModal } from '@/components/shared/ClayPermissionModal';
import type { MediaSource } from '@/domain/media/types';
import type { DocumentSlot } from '@/domain/registration/types';
import { documentSlotsFor } from '@/domain/registration/types';
import { useDocumentSourceFlow } from '@/hooks/register/useDocumentSourceFlow';
import { useServices } from '@/providers/ServicesProvider';
import { documentsStepStyles as styles } from '@/styles/register/documentsStep.styles';

function sourceOptionsFor(slot: DocumentSlot): PickerOption<MediaSource>[] {
  const options: PickerOption<MediaSource>[] = [];
  if (slot.accepts.includes('image')) {
    options.push(
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
    );
  }
  if (slot.accepts.includes('pdf')) {
    options.push({
      value: 'file',
      label: slot.accepts.includes('image') ? 'Subir archivo' : 'Subir PDF',
      description: slot.accepts.includes('image')
        ? 'PDF o imagen desde tus archivos.'
        : 'Selecciona el PDF desde tus archivos.',
      icon: 'document-attach-outline',
    });
  }
  return options;
}

type DocumentsStepProps = {
  wizard: RegisterWizard;
};

/** Paso 3: carga de documentos KYC según el tipo de persona. */
export function DocumentsStep({ wizard }: DocumentsStepProps) {
  const { mediaPicker } = useServices();
  const {
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
  } = useDocumentSourceFlow({ mediaPicker, attachDocument: wizard.attachDocument });

  const slots = documentSlotsFor(wizard.state.identity.personaType);
  const isNatural = wizard.state.identity.personaType === 'natural';

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
          attachment={wizard.state.documents[slot.kind] ?? null}
          error={wizard.visibleErrors[slot.kind]}
          onPick={() => {
            setPickError(null);
            if (isPdfOnly(slot)) {
              void launchPicker(slot, 'file');
            } else {
              setActiveSlot(slot);
            }
          }}
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
            void handleSource(activeSlot, source);
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
