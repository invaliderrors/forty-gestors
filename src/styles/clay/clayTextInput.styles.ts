import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const clayTextInputStyles = StyleSheet.create({
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
    borderRadius: radii.lg,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
    paddingVertical: 12,
  },
  suffix: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.danger,
    marginLeft: spacing.xs,
  },
  helper: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    color: colors.textMuted,
    marginLeft: spacing.xs,
  },
});
