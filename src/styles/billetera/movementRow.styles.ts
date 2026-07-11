import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const movementRowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  iconBubble: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDigital: {
    backgroundColor: colors.accentSoftBg,
  },
  iconCash: {
    backgroundColor: colors.goldSoftBg,
  },
  iconCommission: {
    backgroundColor: colors.surfaceSunken,
  },
  iconRemittance: {
    backgroundColor: colors.dangerSoftBg,
  },
  body: {
    flex: 1,
    gap: 1,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.textPrimary,
  },
  detail: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    color: colors.textSecondary,
  },
  amountBlock: {
    alignItems: 'flex-end',
    gap: 1,
  },
  amount: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.caption,
  },
  amountIn: {
    color: colors.successDeep,
  },
  amountOut: {
    color: colors.textPrimary,
  },
  date: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    color: colors.textMuted,
  },
  pendingChip: {
    fontFamily: fonts.semibold,
    fontSize: 9,
    color: colors.ctaDepth,
  },
});
