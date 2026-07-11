import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRifaCalculator } from '@/application/rifa/useRifaCalculator';
import { RifaCalculatorCard } from '@/components/home/RifaCalculatorCard';
import { RifaProjection } from '@/components/home/RifaProjection';
import { SolicitudConfirmationModal } from '@/components/home/SolicitudConfirmationModal';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { KeyboardAwareScrollView } from '@/components/shared/KeyboardAwareScrollView';
import { LightBackground } from '@/components/shared/LightBackground';
import { useSession } from '@/providers/SessionProvider';
import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

/** Espacio para que el final del scroll no quede debajo de la tab bar flotante. */
const TAB_BAR_SPACE = 84;

/**
 * Inicio del gestor: pantalla clara full-bleed (sin contenedor), con el
 * formulario de la emisión y los números normativos directo en la vista.
 */
export function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { solicitud } = useLocalSearchParams<{ solicitud?: string }>();
  const { session } = useSession();
  const [isSolicitudConfirmed, setIsSolicitudConfirmed] = useState(false);
  const calculator = useRifaCalculator();

  const solicitudId = typeof solicitud === 'string' && solicitud.length > 0 ? solicitud : null;
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
        visible={solicitudId !== null && !isSolicitudConfirmed}
        registrationId={solicitudId ?? ''}
        onContinue={() => setIsSolicitudConfirmed(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingHorizontal: spacing.xxl,
    gap: spacing.xl,
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
    width: 50,
    height: 50,
    borderRadius: radii.pill,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 3,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
    ...clayShadow.subtle,
  },
  greetingBlock: {
    flex: 1,
  },
  greetingEyebrow: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
  },
  greetingName: {
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
    marginTop: -2,
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.surfaceBorder,
    borderBottomWidth: 4,
    borderBottomColor: colors.surfaceDepth,
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
    color: colors.textSecondary,
    marginTop: -spacing.sm,
  },
});
