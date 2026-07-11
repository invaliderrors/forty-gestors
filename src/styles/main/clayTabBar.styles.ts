import { StyleSheet } from 'react-native';

import { colors, fonts, radii, spacing } from '@/theme';

export const clayTabBarStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 14,
    right: 14,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.xxl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderBottomWidth: 5,
    borderBottomColor: colors.surfaceDepth,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    borderRadius: radii.lg,
    paddingVertical: spacing.sm,
  },
  tabActive: {
    backgroundColor: colors.goldSoftBg,
  },
  tabPressed: {
    opacity: 0.7,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    color: colors.textMuted,
  },
  labelActive: {
    color: colors.textPrimary,
  },
});
