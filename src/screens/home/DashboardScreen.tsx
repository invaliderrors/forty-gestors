import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useRifaCalculator } from '@/application/rifa/useRifaCalculator';
import { RifaCalculatorCard } from '@/components/home/RifaCalculatorCard';
import { RifaProjection } from '@/components/home/RifaProjection';
import { SolicitudConfirmationModal } from '@/components/home/SolicitudConfirmationModal';
import { AuthShell } from '@/components/shared/AuthShell';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { useSession } from '@/providers/SessionProvider';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

/** Espacio para que el final del scroll no quede debajo de la tab bar flotante. */
const TAB_BAR_SPACE = 84;

/**
 * Inicio del gestor: configura la emisión de su rifa y Fortu le entrega
 * los números normativos al instante (motor de cálculo del onboarding).
 */
export function DashboardScreen() {
  const { solicitud } = useLocalSearchParams<{ solicitud?: string }>();
  const { session } = useSession();
  const [isSolicitudConfirmed, setIsSolicitudConfirmed] = useState(false);
  const calculator = useRifaCalculator();

  const solicitudId = typeof solicitud === 'string' && solicitud.length > 0 ? solicitud : null;
  const firstName = session?.displayName.trim().split(' ')[0] ?? 'gestor';

  return (
    <AuthShell
      extraBottomPadding={TAB_BAR_SPACE}
      sheetColor={colors.surface}
      heroAccessory={
        <View style={styles.heroBlock}>
          <View style={styles.heroRow}>
            <View style={styles.identityRow}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={22} color={colors.textOnNavy} />
              </View>
              <View>
                <Text style={styles.greetingEyebrow}>Hola,</Text>
                <Text style={styles.greetingName} numberOfLines={1}>
                  {firstName}
                </Text>
              </View>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Notificaciones"
              style={({ pressed }) => [styles.bellButton, pressed && styles.bellPressed]}
              hitSlop={8}
            >
              <Ionicons name="notifications-outline" size={20} color={colors.textOnNavy} />
            </Pressable>
          </View>
          <Text style={styles.heroSubtitle}>
            Configura tu rifa y conoce tus números al instante.
          </Text>
        </View>
      }
    >
      <RifaCalculatorCard calculator={calculator} />

      {calculator.projection ? (
        <RifaProjection projection={calculator.projection} />
      ) : (
        <ClayNotice
          tone="info"
          message="Escribe la cantidad de boletas y el valor de cada una para conocer tu emisión, el premio mínimo, los derechos de explotación y tus ganancias aproximadas."
        />
      )}

      <SolicitudConfirmationModal
        visible={solicitudId !== null && !isSolicitudConfirmed}
        registrationId={solicitudId ?? ''}
        onContinue={() => setIsSolicitudConfirmed(true)}
      />
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  heroBlock: {
    gap: spacing.md,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingEyebrow: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.textOnNavySoft,
  },
  greetingName: {
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
    color: colors.textOnNavy,
    marginTop: -2,
  },
  bellButton: {
    width: 42,
    height: 42,
    borderRadius: radii.lg,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellPressed: {
    opacity: 0.65,
  },
  heroSubtitle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 22,
    color: colors.textOnNavySoft,
  },
});
