import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useRifaCalculator } from '@/application/rifa/useRifaCalculator';
import { RifaCalculatorCard } from '@/components/home/RifaCalculatorCard';
import { RifaProjection } from '@/components/home/RifaProjection';
import { SolicitudConfirmationModal } from '@/components/home/SolicitudConfirmationModal';
import { AuthShell } from '@/components/shared/AuthShell';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { FortuLogo } from '@/components/shared/FortuLogo';
import { colors, radii } from '@/theme';

/** Espacio para que el final del scroll no quede debajo de la tab bar flotante. */
const TAB_BAR_SPACE = 84;

/**
 * Inicio del gestor: configura la emisión de su rifa y Fortu le entrega
 * los números normativos al instante (motor de cálculo del onboarding).
 */
export function DashboardScreen() {
  const { solicitud } = useLocalSearchParams<{ solicitud?: string }>();
  const [isSolicitudConfirmed, setIsSolicitudConfirmed] = useState(false);
  const calculator = useRifaCalculator();

  const solicitudId = typeof solicitud === 'string' && solicitud.length > 0 ? solicitud : null;

  return (
    <AuthShell
      title="Hola, gestor"
      subtitle="Configura tu rifa y conoce tus números al instante."
      extraBottomPadding={TAB_BAR_SPACE}
      heroAccessory={
        <View style={styles.heroRow}>
          <FortuLogo size={30} />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notificaciones"
            style={({ pressed }) => [styles.bellButton, pressed && styles.bellPressed]}
            hitSlop={8}
          >
            <Ionicons name="notifications-outline" size={20} color={colors.textOnNavy} />
          </Pressable>
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
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});
