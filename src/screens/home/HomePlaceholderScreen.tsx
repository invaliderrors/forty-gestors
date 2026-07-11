import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SolicitudConfirmationModal } from '@/components/home/SolicitudConfirmationModal';
import { AuthShell } from '@/components/shared/AuthShell';
import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayCard } from '@/components/shared/clay/ClayCard';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

/**
 * Placeholder del panel del gestor. Se reemplaza cuando construyamos
 * la fase de operación (dashboard, rifas, vendedores, wallet).
 * Si se llega desde el registro, muestra primero la confirmación de la
 * solicitud con su número institucional.
 */
export function HomePlaceholderScreen() {
  const router = useRouter();
  const { solicitud } = useLocalSearchParams<{ solicitud?: string }>();
  const [isSolicitudConfirmed, setIsSolicitudConfirmed] = useState(false);

  const solicitudId = typeof solicitud === 'string' && solicitud.length > 0 ? solicitud : null;

  return (
    <AuthShell
      title="Panel del gestor"
      subtitle="Esto es lo que viene en las próximas iteraciones."
    >
      <ClayCard style={styles.card}>
        <View style={styles.iconBubble}>
          <Ionicons name="construct-outline" size={26} color={colors.accentDeep} />
        </View>
        <Text style={styles.title}>En construcción</Text>
        <Text style={styles.message}>
          Aquí vivirán tus rifas, tus vendedores, el recaudo y la contabilidad. Por ahora dejamos
          listo el acceso y el registro con verificación KYC.
        </Text>
      </ClayCard>
      <ClayButton
        label="Cerrar sesión"
        variant="secondary"
        onPress={() => router.replace('/login')}
      />

      <SolicitudConfirmationModal
        visible={solicitudId !== null && !isSolicitudConfirmed}
        registrationId={solicitudId ?? ''}
        onContinue={() => setIsSolicitudConfirmed(true)}
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
  title: {
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
