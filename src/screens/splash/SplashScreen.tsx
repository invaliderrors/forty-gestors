import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { clayShadow, colors, fonts, radii, spacing } from '@/theme';

const SPLASH_DURATION_MS = 2400;

/**
 * Splash de marca: símbolo Fortu sobre un disco clay flotante en el
 * navy de marca. Al terminar navega al login.
 */
export function SplashScreen() {
  const router = useRouter();
  const puckScale = useSharedValue(0.6);
  const puckOpacity = useSharedValue(0);
  const float = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    puckOpacity.value = withTiming(1, { duration: 450 });
    puckScale.value = withSpring(1, { damping: 12, stiffness: 120 });
    float.value = withDelay(
      500,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1100, easing: Easing.inOut(Easing.quad) }),
          withTiming(0, { duration: 1100, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
      ),
    );
    textOpacity.value = withDelay(450, withTiming(1, { duration: 500 }));

    const timer = setTimeout(() => {
      router.replace('/login');
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [float, puckOpacity, puckScale, router, textOpacity]);

  const puckStyle = useAnimatedStyle(() => ({
    opacity: puckOpacity.value,
    transform: [{ scale: puckScale.value }, { translateY: -float.value * 8 }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: (1 - textOpacity.value) * 12 }],
  }));

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.heroTop} />
      <LinearGradient
        colors={[colors.heroTop, colors.heroMid, colors.heroBottom]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.orbTop} pointerEvents="none" />
      <View style={styles.orbBottom} pointerEvents="none" />

      <View style={styles.center}>
        <Animated.View style={[styles.puck, puckStyle]}>
          <Image
            source={require('@/assets/images/Logo_Simbolo.png')}
            style={styles.symbol}
            contentFit="contain"
            accessibilityLabel="Símbolo de Fortu"
          />
        </Animated.View>

        <Animated.View style={[styles.brandBlock, textStyle]}>
          <Image
            source={require('@/assets/images/Logo_FORTU.png')}
            style={styles.wordmark}
            contentFit="contain"
            accessibilityLabel="Fortu"
          />
          <View style={styles.tag}>
            <Text style={styles.tagLabel}>GESTOR</Text>
          </View>
        </Animated.View>
      </View>

      <Text style={styles.footer}>Rifas legales, gestión sin enredos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.heroBottom,
  },
  orbTop: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: 'rgba(89,205,241,0.14)',
    top: -120,
    right: -100,
  },
  orbBottom: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(254,201,55,0.10)',
    bottom: -110,
    left: -90,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxxl,
  },
  puck: {
    width: 148,
    height: 148,
    borderRadius: 44,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 6,
    borderBottomColor: colors.surfaceDepth,
    ...clayShadow.floating,
  },
  symbol: {
    width: 84,
    height: 84,
  },
  brandBlock: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  wordmark: {
    width: 190,
    height: 70,
  },
  tag: {
    backgroundColor: colors.ctaFace,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.xl,
    paddingVertical: 6,
    borderBottomWidth: 3,
    borderBottomColor: colors.ctaDepth,
  },
  tagLabel: {
    fontFamily: fonts.display,
    fontSize: 14,
    letterSpacing: 5,
    color: colors.textOnGold,
  },
  footer: {
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textOnNavySoft,
    marginBottom: 48,
  },
});
