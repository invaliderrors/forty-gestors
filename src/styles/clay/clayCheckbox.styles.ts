import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const clayCheckboxStyles = StyleSheet.create({
  container: {
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  rowPressed: {
    opacity: 0.75,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: radii.sm - 4,
    borderWidth: 2,
    borderColor: colors.inputBorder,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  boxChecked: {
    backgroundColor: colors.ctaFace,
    borderColor: colors.ctaDepth,
  },
  boxError: {
    borderColor: colors.inputBorderError,
  },
  label: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 19,
    color: colors.textSecondary,
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.danger,
    marginLeft: 36,
  },
});
