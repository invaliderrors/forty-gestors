import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { loadingDotsStyles as styles } from '@/styles/shared/loadingDots.styles';
import { colors } from '@/theme';

type LoadingDotsProps = {
  color?: string;
  size?: number;
};

function Dot({ color, size, delay }: { color: string; size: number; delay: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 320, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 320, easing: Easing.in(Easing.quad) }),
        ),
        -1,
      ),
    );
  }, [delay, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.35 + progress.value * 0.65,
    transform: [{ translateY: -progress.value * 3 }],
  }));

  return (
    <Animated.View
      style={[
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color },
        animatedStyle,
      ]}
    />
  );
}

/** Indicador de acción en curso (regla de la casa: nada de ActivityIndicator). */
export function LoadingDots({ color = colors.textPrimary, size = 7 }: LoadingDotsProps) {
  return (
    <View style={styles.row} accessibilityRole="progressbar">
      <Dot color={color} size={size} delay={0} />
      <Dot color={color} size={size} delay={140} />
      <Dot color={color} size={size} delay={280} />
    </View>
  );
}
