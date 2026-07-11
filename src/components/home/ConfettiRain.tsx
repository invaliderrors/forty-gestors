import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { palette } from '@/theme';

const PIECE_COLORS = [palette.gold, palette.cyan, palette.goldLight, palette.navy300, '#FFFFFF'];
const PIECE_COUNT = 14;

type PieceSpec = {
  left: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  drift: number;
};

function Piece({ spec, fieldHeight }: { spec: PieceSpec; fieldHeight: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      spec.delay,
      withRepeat(withTiming(1, { duration: spec.duration, easing: Easing.linear }), -1),
    );
  }, [progress, spec.delay, spec.duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value < 0.06 ? progress.value * 12 : 1 - progress.value * 0.55,
    transform: [
      { translateY: -24 + progress.value * (fieldHeight + 48) },
      { translateX: Math.sin(progress.value * Math.PI * 2) * spec.drift },
      { rotate: `${progress.value * 540}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.piece,
        {
          left: `${spec.left}%`,
          width: spec.size,
          height: spec.size * 1.8,
          backgroundColor: spec.color,
        },
        animatedStyle,
      ]}
    />
  );
}

type ConfettiRainProps = {
  /** Alto del área donde caen las serpentinas. */
  fieldHeight?: number;
};

/** Serpentinas cayendo en loop (decoración de la card de ganancias). */
export function ConfettiRain({ fieldHeight = 190 }: ConfettiRainProps) {
  const pieces = useMemo<PieceSpec[]>(
    () =>
      Array.from({ length: PIECE_COUNT }, (_, index) => ({
        left: (index * 83) % 96,
        size: 5 + ((index * 7) % 5),
        color: PIECE_COLORS[index % PIECE_COLORS.length],
        duration: 2600 + ((index * 431) % 1800),
        delay: (index * 353) % 2400,
        drift: 6 + ((index * 13) % 12),
      })),
    [],
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {pieces.map((spec, index) => (
        <Piece key={index} spec={spec} fieldHeight={fieldHeight} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  piece: {
    position: 'absolute',
    top: 0,
    borderRadius: 2,
  },
});
