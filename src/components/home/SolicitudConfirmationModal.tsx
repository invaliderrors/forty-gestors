import { Ionicons } from '@expo/vector-icons';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { ClayButton } from '@/components/shared/clay/ClayButton';
import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

type SolicitudConfirmationModalProps = {
  visible: boolean;
  /** Número institucional de la solicitud (AAAAMM-consecutivo). */
  registrationId: string;
  onContinue: () => void;
};

/**
 * Confirmación de la solicitud registrada, mostrada al llegar por primera
 * vez al panel: número institucional + "Sí, continuar" para entrar.
 */
export function SolicitudConfirmationModal({
  visible,
  registrationId,
  onContinue,
}: SolicitudConfirmationModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onContinue}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.badge}>
            <Ionicons name="checkmark" size={40} color={colors.textOnGold} />
          </View>
          <Text style={styles.title}>¡Solicitud registrada!</Text>
          <View style={styles.refCard}>
            <Text style={styles.refLabel}>Número de solicitud</Text>
            <Text style={styles.refValue}>{registrationId}</Text>
          </View>
          <Text style={styles.message}>
            Guarda este número: con él haremos seguimiento a la revisión de tus documentos. Te
            avisaremos por correo cuando la verificación termine.
          </Text>
          <ClayButton label="Sí, continuar" onPress={onContinue} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(4,8,15,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.surface,
    borderRadius: radii.xxl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderBottomWidth: 5,
    borderBottomColor: colors.surfaceDepth,
    padding: spacing.xxl,
    alignItems: 'stretch',
    gap: spacing.lg,
    ...clayShadow.floating,
  },
  badge: {
    alignSelf: 'center',
    width: 88,
    height: 88,
    borderRadius: 30,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 5,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
    ...clayShadow.goldCta,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  refCard: {
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.goldSoftBg,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: colors.ctaFace,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  refLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  refValue: {
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
    letterSpacing: 1,
    color: colors.textPrimary,
  },
  message: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 19,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
