import { StyleSheet, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Rect,
  RadialGradient,
  Stop,
} from 'react-native-svg';

import {
  ORB_CYAN_SIZE,
  ORB_GOLD_SIZE,
  screenBackgroundStyles as styles,
} from '@/styles/shared/screenBackground.styles';
import { colors, palette } from '@/theme';

/**
 * Fondo navy de Fortu Gestor, todo en SVG: gradiente vertical con
 * nuestros stops + orbes radiales propios (cyan arriba-derecha, dorado
 * abajo-izquierda; disposición inversa a fortu-app a propósito, para que
 * las dos apps compartan marca sin verse iguales).
 */
export function ScreenBackground() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id="gestorBgNavy" x1="0.5" y1="0" x2="0.5" y2="1">
            <Stop offset="0" stopColor={colors.heroGradient[0]} />
            <Stop offset="0.45" stopColor={colors.heroGradient[1]} />
            <Stop offset="1" stopColor={colors.heroGradient[2]} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#gestorBgNavy)" />
      </Svg>

      <View style={styles.orbCyan}>
        <Svg width={ORB_CYAN_SIZE} height={ORB_CYAN_SIZE}>
          <Defs>
            <RadialGradient id="gestorOrbCyan" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={palette.cyan} stopOpacity="0.26" />
              <Stop offset="60%" stopColor={palette.cyan} stopOpacity="0.07" />
              <Stop offset="100%" stopColor={palette.cyan} stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle
            cx={ORB_CYAN_SIZE / 2}
            cy={ORB_CYAN_SIZE / 2}
            r={ORB_CYAN_SIZE / 2}
            fill="url(#gestorOrbCyan)"
          />
        </Svg>
      </View>

      <View style={styles.orbGold}>
        <Svg width={ORB_GOLD_SIZE} height={ORB_GOLD_SIZE}>
          <Defs>
            <RadialGradient id="gestorOrbGold" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={palette.gold} stopOpacity="0.12" />
              <Stop offset="65%" stopColor={palette.gold} stopOpacity="0.04" />
              <Stop offset="100%" stopColor={palette.gold} stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle
            cx={ORB_GOLD_SIZE / 2}
            cy={ORB_GOLD_SIZE / 2}
            r={ORB_GOLD_SIZE / 2}
            fill="url(#gestorOrbGold)"
          />
        </Svg>
      </View>
    </View>
  );
}
