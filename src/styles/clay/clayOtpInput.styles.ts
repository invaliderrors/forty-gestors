import { StyleSheet } from 'react-native';

import { colors, fonts, radii, spacing } from '@/theme';

export const clayOtpInputStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  cell: {
    width: 48,
    height: 58,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderBottomColor: colors.surfaceDepth,
  },
  cellFilled: {
    backgroundColor: colors.surface,
    borderColor: colors.ctaFace,
    borderBottomColor: colors.ctaDepth,
  },
  cellActive: {
    borderColor: colors.inputBorderFocused,
    backgroundColor: colors.surface,
  },
  cellError: {
    borderColor: colors.inputBorderError,
  },
  digit: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: colors.textPrimary,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
