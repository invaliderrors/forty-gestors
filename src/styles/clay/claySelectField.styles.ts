import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const claySelectFieldStyles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    borderRadius: radii.lg,
    backgroundColor: colors.inputBg,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
  },
  fieldError: {
    borderColor: colors.inputBorderError,
  },
  fieldPressed: {
    backgroundColor: colors.inputBgFocused,
  },
  icon: {
    marginRight: spacing.sm,
  },
  value: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  placeholder: {
    color: colors.inputPlaceholder,
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.danger,
    marginLeft: spacing.xs,
  },
});
