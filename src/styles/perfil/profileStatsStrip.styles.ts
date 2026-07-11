import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, spacing } from '@/theme';

export const profileStatsStripStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    // Alineación por el tope: si una etiqueta ocupa dos líneas, los
    // valores de las tres celdas siguen en la misma línea base.
    alignItems: 'flex-start',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: spacing.xs,
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.surfaceBorder,
  },
  value: {
    fontFamily: fonts.display,
    fontSize: fontSizes.subtitle,
    lineHeight: 24,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.micro,
    lineHeight: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
