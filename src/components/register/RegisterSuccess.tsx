import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayCard } from '@/components/shared/clay/ClayCard';
import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

type RegisterSuccessProps = {
  registrationId: string;
  onGoToLogin: () => void;
};

/** Estado final del registro: solicitud enviada, cuenta en verificación. */
export function RegisterSuccess({ registrationId, onGoToLogin }: RegisterSuccessProps) {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Ionicons name="checkmark" size={44} color={colors.textOnGold} />
      </View>
      <Text style={styles.title}>¡Solicitud enviada!</Text>
      <Text style={styles.message}>
        Recibimos tus datos y documentos. Vamos a verificar tu identidad ante Coljuegos y el
        Operador autorizado; te avisaremos por correo cuando tu cuenta esté activa.
      </Text>
      <ClayCard flat style={styles.refCard}>
        <Text style={styles.refLabel}>Número de solicitud</Text>
        <Text style={styles.refValue}>{registrationId}</Text>
      </ClayCard>
      <ClayButton label="Ir a iniciar sesión" onPress={onGoToLogin} />
      <Text style={styles.mockHint}>
        Modo demo: tu cuenta ya quedó activa, puedes entrar con el correo y la contraseña que
        registraste.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
    alignItems: 'stretch',
    paddingTop: spacing.xl,
  },
  badge: {
    alignSelf: 'center',
    width: 96,
    height: 96,
    borderRadius: 32,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 6,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
    ...clayShadow.goldCta,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: fontSizes.display,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  message: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  refCard: {
    alignItems: 'center',
    gap: spacing.xs,
    borderRadius: radii.lg,
  },
  refLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  refValue: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
  },
  mockHint: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
