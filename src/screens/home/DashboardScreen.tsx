import { Ionicons } from '@expo/vector-icons';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRifaCalculator } from '@/application/rifa/useRifaCalculator';
import { RifaCalculatorCard } from '@/components/home/RifaCalculatorCard';
import { RifaProjection } from '@/components/home/RifaProjection';
import { SolicitudConfirmationModal } from '@/components/home/SolicitudConfirmationModal';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { KeyboardAwareScrollView } from '@/components/shared/KeyboardAwareScrollView';
import { LightBackground } from '@/components/shared/LightBackground';
import { useSolicitudConfirmation } from '@/hooks/home/useSolicitudConfirmation';
import { useSession } from '@/providers/SessionProvider';
import { dashboardStyles as styles } from '@/styles/home/dashboard.styles';
import { colors, spacing } from '@/theme';

/** Espacio para que el final del scroll no quede debajo de la tab bar flotante. */
const TAB_BAR_SPACE = 84;

/**
 * Inicio del gestor: pantalla clara full-bleed (sin contenedor), con el
 * formulario de la emisión y los números normativos directo en la vista.
 */
export function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { session } = useSession();
  const solicitudConfirmation = useSolicitudConfirmation();
  const calculator = useRifaCalculator();

  const firstName = session?.displayName.trim().split(' ')[0] ?? 'gestor';

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LightBackground />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.lg,
            paddingBottom: insets.bottom + spacing.xxxl + TAB_BAR_SPACE,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroRow}>
          <View style={styles.identityRow}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={22} color={colors.ctaText} />
            </View>
            <View style={styles.greetingBlock}>
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
            <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
          </Pressable>
        </View>
        <Text style={styles.heroSubtitle}>
          Configura tu rifa y conoce tus números al instante.
        </Text>

        <RifaCalculatorCard calculator={calculator} />

        {calculator.projection ? (
          <RifaProjection projection={calculator.projection} />
        ) : (
          <ClayNotice
            tone="info"
            message="Escribe la cantidad de boletas y el valor de cada una para conocer tu emisión, el premio mínimo, los derechos de explotación y tus ganancias aproximadas."
          />
        )}
      </KeyboardAwareScrollView>

      <SolicitudConfirmationModal
        visible={solicitudConfirmation.isVisible}
        registrationId={solicitudConfirmation.solicitudId ?? ''}
        onContinue={solicitudConfirmation.confirm}
      />
    </View>
  );
}
