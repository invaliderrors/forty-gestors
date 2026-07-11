import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { ClayButton } from '@/components/shared/clay/ClayButton';
import { clayShadow, colors, fonts, fontSizes, spacing } from '@/theme';

type WelcomeViewProps = {
  displayName: string;
  onContinue: () => void;
};

/** Bienvenida tras verificar el correo: cuenta activa, rumbo al panel. */
export function WelcomeView({ displayName, onContinue }: WelcomeViewProps) {
  const badgeScale = useSharedValue(0.4);
  const badgeOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    badgeOpacity.value = withTiming(1, { duration: 350 });
    badgeScale.value = withSpring(1, { damping: 11, stiffness: 140 });
    textOpacity.value = withDelay(
      280,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.quad) }),
    );
  }, [badgeOpacity, badgeScale, textOpacity]);

  const badgeStyle = useAnimatedStyle(() => ({
    opacity: badgeOpacity.value,
    transform: [{ scale: badgeScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: (1 - textOpacity.value) * 14 }],
  }));

  const firstName = displayName.trim().split(' ')[0] || 'gestor';

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.badge, badgeStyle]}>
        <Ionicons name="ribbon" size={46} color={colors.textOnGold} />
      </Animated.View>
      <Animated.View style={[styles.textBlock, textStyle]}>
        <Text style={styles.title}>¡Todo listo, {firstName}!</Text>
        <Text style={styles.message}>
          Tu correo quedó verificado y tu cuenta de gestor está activa. Bienvenido a Fortu
          Gestor.
        </Text>
        <Text style={styles.note}>
          Seguimos revisando tus documentos en segundo plano; te avisaremos si necesitamos algo
          más.
        </Text>
      </Animated.View>
      <ClayButton label="Ir a mi panel" onPress={onContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xxl,
    alignItems: 'stretch',
  },
  badge: {
    alignSelf: 'center',
    width: 104,
    height: 104,
    borderRadius: 34,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 6,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
    ...clayShadow.goldCta,
  },
  textBlock: {
    gap: spacing.md,
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
  note: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 19,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
