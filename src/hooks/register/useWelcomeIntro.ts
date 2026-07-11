import { useEffect } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

/**
 * Animación de entrada de la bienvenida: el badge aparece con spring y el
 * bloque de texto hace fade + subida con un pequeño retardo.
 */
export function useWelcomeIntro() {
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

  return { badgeStyle, textStyle };
}
