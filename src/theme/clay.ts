import type { ViewStyle } from 'react-native';

import { colors } from '@/theme/colors';

/**
 * Presets de sombra "clay": exterior suave y difusa, teñida de azul para
 * que las superficies parezcan flotar sobre el lienzo claro.
 * El labio de profundidad (borde inferior oscuro) lo aporta cada
 * componente con una capa propia — RN no soporta inner shadows.
 */
export const clayShadow = {
  raised: {
    shadowColor: colors.shadowOnLight,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 8,
  } satisfies ViewStyle,

  floating: {
    shadowColor: colors.shadowOnLight,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 26,
    elevation: 12,
  } satisfies ViewStyle,

  subtle: {
    shadowColor: colors.shadowOnLight,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  } satisfies ViewStyle,

  goldCta: {
    shadowColor: colors.shadowGold,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.32,
    shadowRadius: 16,
    elevation: 9,
  } satisfies ViewStyle,
} as const;

export const radii = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
  pill: 999,
  /** Radio del sheet claro que sube sobre el hero navy. */
  sheet: 32,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/** Grosor del labio inferior que da el efecto de masilla presionable. */
export const clayDepth = {
  button: 6,
  buttonPressed: 2,
  card: 4,
} as const;
