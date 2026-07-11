/**
 * Paleta de marca Fortu compartida con fortu-app (dorado, azules, cyan),
 * pero con tokens semánticos PROPIOS de Fortu Gestor: lienzo claro con
 * claymorfismo, navy en heros/splash y blanco para contraste. La idea es
 * compartir marca sin replicar la identidad visual de la otra app.
 *
 * Los componentes NUNCA usan `palette` directamente: consumen `colors`,
 * el punto único de theming (whitelabel futuro = reemplazar este archivo).
 */
export const palette = {
  cyan: '#59CDF1',
  cyanSoft: '#7AD9F5',
  cyanDeep: '#2596BE',

  gold: '#FEC937',
  goldLight: '#FFD658',
  goldDeep: '#E9B021',
  goldGlow: '#FFE082',

  navy50: '#EAEEF7',
  navy100: '#C3CFE6',
  navy300: '#2C5BE3',
  navy400: '#1A3FA8',
  navy500: '#1535A8',
  navy600: '#1A4AD6',
  navy700: '#0D2580',
  navy800: '#0A1931',
  navy900: '#04080F',

  white: '#FFFFFF',
  success: '#22C55E',
  successDeep: '#16A34A',
  danger: '#EF4444',
  dangerSoft: '#F87171',
} as const;

export const colors = {
  /** Lienzo claro de las vistas (blanco azulado, contraste con navy y gold). */
  background: '#EDF2FA',
  /** Superficie clay principal (cards, inputs elevados). */
  surface: palette.white,
  /** Superficie hundida (fondos de input, chips inactivos). */
  surfaceSunken: '#EFF3FB',
  /** Borde sutil de superficies clay sobre el lienzo claro. */
  surfaceBorder: '#E2EAF7',
  /** Labio de profundidad de superficies blancas. */
  surfaceDepth: '#CFDCF0',
  /** Fondo de sheets/modales. */
  surfaceModal: '#EDF2FA',

  /** Gradiente navy propio de heros y splash (stops del SVG). */
  heroGradient: ['#1A4AD6', '#1535A8', '#0A1931'] as const,
  heroBase: palette.navy800,

  textPrimary: palette.navy800,
  textSecondary: '#46587A',
  textMuted: '#8494B3',
  textOnNavy: palette.white,
  textOnNavySoft: 'rgba(255,255,255,0.72)',
  textOnGold: palette.navy800,
  textLink: palette.navy300,

  /** Blobs decorativos del lienzo claro. */
  blobGold: '#FFE9A8',
  blobCyan: '#C9EDFB',

  /** CTA principal (clay dorado). */
  ctaFace: palette.gold,
  ctaFaceHighlight: 'rgba(255,255,255,0.55)',
  ctaDepth: '#D9A114',
  ctaText: palette.navy800,

  /** Botón secundario (clay blanco). */
  secondaryFace: palette.white,
  secondaryDepth: '#C9D6EC',
  secondaryText: palette.navy500,

  /** Estados de input. */
  inputBg: '#EFF3FB',
  inputBgFocused: palette.white,
  inputBorder: '#DCE6F5',
  inputBorderFocused: palette.cyan,
  inputBorderError: palette.dangerSoft,
  inputPlaceholder: '#9AA9C4',

  accent: palette.cyan,
  accentDeep: palette.cyanDeep,
  accentSoftBg: '#E4F6FD',
  goldSoftBg: '#FFF6DC',

  success: palette.success,
  successDeep: palette.successDeep,
  successSoftBg: '#E7F8EE',
  danger: palette.danger,
  dangerSoftBg: '#FDECEC',

  /** Sombras clay (color base, la opacidad vive en theme/clay.ts). */
  shadowOnLight: '#16337E',
  shadowGold: '#B07E00',
} as const;

export type ThemeColors = typeof colors;
