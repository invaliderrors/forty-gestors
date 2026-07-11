import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ScreenBackground } from '@/components/shared/ScreenBackground';
import { colors, spacing } from '@/theme';

const SPLASH_DURATION_MS = 2800;
const HALO_SIZE = 280;

/**
 * Splash de marca: wordmark Fortu con arcos Lottie orbitando sobre el
 * gradiente navy propio. Al terminar navega al login.
 */
export function SplashScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 650, easing: Easing.out(Easing.cubic) });
    scale.value = withTiming(1, { duration: 750, easing: Easing.out(Easing.cubic) });

    const timer = setTimeout(() => {
      router.replace('/login');
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [opacity, router, scale]);

  const brandStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScreenBackground />

      <View style={styles.center}>
        <Animated.View style={[styles.haloArea, brandStyle]}>
          <LottieView
            source={require('@/assets/lottie/splash-halo.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
          <Image
            source={require('@/assets/images/Logo_FORTU.png')}
            style={styles.wordmark}
            contentFit="contain"
            accessibilityLabel="Fortu"
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.heroBase,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxxl,
  },
  haloArea: {
    width: HALO_SIZE,
    height: HALO_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wordmark: {
    width: 150,
    height: 56,
  },
});
