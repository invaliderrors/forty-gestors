import { useEffect, useRef } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const SPLASH_DURATION_MS = 2800;

/**
 * Animación de entrada del splash (fade + scale de la marca) y temporizador
 * de salida: al cumplirse la duración invoca `onFinish` (navegación al login).
 */
export function useSplashIntro(onFinish: () => void) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  // Ref para no reiniciar la animación ni el temporizador si el caller
  // pasa una arrow function nueva en cada render. Se actualiza en un
  // efecto (escribirlo durante el render lo prohíbe el React Compiler).
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 650, easing: Easing.out(Easing.cubic) });
    scale.value = withTiming(1, { duration: 750, easing: Easing.out(Easing.cubic) });

    const timer = setTimeout(() => {
      onFinishRef.current();
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [opacity, scale]);

  const brandStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return { brandStyle };
}
