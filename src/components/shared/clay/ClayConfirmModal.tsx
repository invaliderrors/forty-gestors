import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { ClayButton } from '@/components/shared/clay/ClayButton';
import { LoadingDots } from '@/components/shared/LoadingDots';
import { clayConfirmModalStyles as styles } from '@/styles/clay/clayConfirmModal.styles';
import { colors } from '@/theme';

type ClayConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/** Confirmación de acción destructiva (eliminar vendedor, invitación...). */
export function ClayConfirmModal({
  visible,
  title,
  message,
  confirmLabel,
  busy = false,
  onConfirm,
  onCancel,
}: ClayConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} accessibilityLabel="Cerrar" />
        <View style={styles.card}>
          <View style={styles.iconBubble}>
            <Ionicons name="trash-outline" size={26} color={colors.danger} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={confirmLabel}
              onPress={onConfirm}
              disabled={busy}
              style={({ pressed }) => [styles.dangerButton, pressed && styles.dangerPressed]}
            >
              {busy ? (
                <LoadingDots color={colors.surface} />
              ) : (
                <Text style={styles.dangerLabel}>{confirmLabel}</Text>
              )}
            </Pressable>
            <ClayButton label="Cancelar" variant="ghost" onPress={onCancel} disabled={busy} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
