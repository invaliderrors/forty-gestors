import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { ClayButton } from '@/components/shared/clay/ClayButton';
import type { MediaPermissionKind } from '@/domain/media/MediaPicker';
import { clayPermissionModalStyles as styles } from '@/styles/shared/clayPermissionModal.styles';
import { colors } from '@/theme';

const COPY: Record<
  MediaPermissionKind,
  { icon: keyof typeof Ionicons.glyphMap; title: string; message: string }
> = {
  camera: {
    icon: 'camera-outline',
    title: 'Acceso a la cámara',
    message:
      'Para capturar tu documento necesitamos usar la cámara del teléfono. Solo la usamos mientras tomas la foto.',
  },
  gallery: {
    icon: 'images-outline',
    title: 'Acceso a tus fotos',
    message:
      'Para adjuntar un documento que ya tienes en el teléfono necesitamos acceder a tu galería.',
  },
};

type ClayPermissionModalProps = {
  visible: boolean;
  kind: MediaPermissionKind;
  /** El sistema ya no puede volver a preguntar: hay que ir a los ajustes. */
  blocked: boolean;
  onAllow: () => void;
  onOpenSettings: () => void;
  onDismiss: () => void;
};

/** Modal explicativo que antecede al diálogo de permisos del sistema. */
export function ClayPermissionModal({
  visible,
  kind,
  blocked,
  onAllow,
  onOpenSettings,
  onDismiss,
}: ClayPermissionModalProps) {
  const copy = COPY[kind];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.backdrop}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onDismiss}
          accessibilityLabel="Cerrar"
        />
        <View style={styles.card}>
          <View style={styles.iconBubble}>
            <Ionicons name={copy.icon} size={30} color={colors.textOnGold} />
          </View>
          <Text style={styles.title}>{copy.title}</Text>
          <Text style={styles.message}>
            {blocked
              ? `El permiso está desactivado en el teléfono. Actívalo desde los ajustes para continuar.`
              : copy.message}
          </Text>
          <View style={styles.actions}>
            {blocked ? (
              <ClayButton label="Abrir ajustes" onPress={onOpenSettings} />
            ) : (
              <ClayButton label="Permitir" onPress={onAllow} />
            )}
            <ClayButton label="Ahora no" variant="ghost" onPress={onDismiss} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
