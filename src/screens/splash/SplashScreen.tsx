import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { StatusBar, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { ScreenBackground } from '@/components/shared/ScreenBackground';
import { useSplashIntro } from '@/hooks/splash/useSplashIntro';
import { splashStyles as styles } from '@/styles/auth/splash.styles';

/**
 * Splash de marca: wordmark Fortu con arcos Lottie orbitando sobre el
 * gradiente navy propio. Al terminar navega al login.
 */
export function SplashScreen() {
  const router = useRouter();
  const { brandStyle } = useSplashIntro(() => router.replace('/login'));

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
