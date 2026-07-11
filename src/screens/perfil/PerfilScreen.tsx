import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AuthShell } from '@/components/shared/AuthShell';
import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayCard } from '@/components/shared/clay/ClayCard';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

const TAB_BAR_SPACE = 84;

/** Perfil del gestor (placeholder + cierre de sesión). */
export function PerfilScreen() {
  const router = useRouter();

  return (
    <AuthShell
      title="Perfil"
      subtitle="Tu cuenta de gestor."
      centerContent
      extraBottomPadding={TAB_BAR_SPACE}
    >
      <ClayCard style={styles.card}>
        <View style={styles.iconBubble}>
          <Ionicons name="person-outline" size={26} color={colors.accentDeep} />
        </View>
        <Text style={styles.cardTitle}>Próximamente</Text>
        <Text style={styles.message}>
          Aquí vivirán tus datos, la configuración whitelabel de tu marca y la seguridad de tu
          cuenta.
        </Text>
      </ClayCard>
      <ClayButton
        label="Cerrar sesión"
        variant="secondary"
        onPress={() => router.replace('/login')}
      />
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBubble: {
    width: 56,
    height: 56,
    borderRadius: radii.lg,
    backgroundColor: colors.accentSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
  },
  message: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
