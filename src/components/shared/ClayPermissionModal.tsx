import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { ClayButton } from '@/components/shared/clay/ClayButton';
import type { MediaPermissionKind } from '@/domain/media/MediaPicker';
import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

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

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(4,8,15,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.surface,
    borderRadius: radii.xxl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderBottomWidth: 5,
    borderBottomColor: colors.surfaceDepth,
    padding: spacing.xxl,
    alignItems: 'center',
    gap: spacing.md,
    ...clayShadow.floating,
  },
  iconBubble: {
    width: 64,
    height: 64,
    borderRadius: radii.lg,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 4,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  message: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actions: {
    alignSelf: 'stretch',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});
