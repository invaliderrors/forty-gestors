/**
 * Familias tipográficas de la marca. En React Native cada peso es su
 * propia fontFamily (no existe fontWeight lógico para fuentes custom),
 * así que los componentes siempre referencian estos tokens.
 *
 * - Nunito (redonda) para display: hace juego con el wordmark de Fortu.
 * - Plus Jakarta Sans para UI y cuerpo.
 */
export const fonts = {
  display: 'Nunito_900Black',
  displaySoft: 'Nunito_800ExtraBold',
  bold: 'PlusJakartaSans_700Bold',
  semibold: 'PlusJakartaSans_600SemiBold',
  medium: 'PlusJakartaSans_500Medium',
  regular: 'PlusJakartaSans_400Regular',
} as const;

export const fontSizes = {
  displayXl: 34,
  display: 28,
  title: 22,
  subtitle: 17,
  body: 15,
  caption: 13,
  micro: 11,
} as const;
