import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

import { colors } from '@/theme';

function Blob({
  id,
  size,
  color,
  style,
}: {
  id: string;
  size: number;
  color: string;
  style: object;
}) {
  return (
    <View pointerEvents="none" style={[styles.blob, style, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id={id} cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <Stop offset="70%" stopColor={color} stopOpacity="0.35" />
            <Stop offset="100%" stopColor={color} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}

/**
 * Fondo claro de pantalla completa: blanco con los blobs de gradiente
 * de marca (dorado arriba-derecha, cyan abajo-izquierda).
 */
export function LightBackground() {
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.root]}>
      <Blob id="lightBlobGold" size={320} color={colors.blobGold} style={styles.gold} />
      <Blob id="lightBlobCyan" size={380} color={colors.blobCyan} style={styles.cyan} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.surface,
  },
  blob: {
    position: 'absolute',
  },
  gold: {
    top: -100,
    right: -90,
  },
  cyan: {
    bottom: -150,
    left: -130,
  },
});
