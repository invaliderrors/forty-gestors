import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const rifaProjectionStyles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  sectionLabel: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  numbersCard: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    backgroundColor: colors.accentSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  rowValue: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceBorder,
  },
  insurersCard: {
    gap: spacing.md,
  },
  insurersLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
  },
  insurersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  insurerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.accentSoftBg,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  insurerName: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.accentDeep,
  },
  earningsCard: {
    backgroundColor: colors.ctaFace,
    borderRadius: radii.xxl,
    borderBottomWidth: 6,
    borderBottomColor: colors.ctaDepth,
    padding: spacing.xxl,
    alignItems: 'center',
    gap: spacing.sm,
    overflow: 'hidden',
  },
  earningsEyebrow: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.micro,
    lineHeight: 15,
    color: 'rgba(10,25,49,0.75)',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  earningsLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.textOnGold,
    textAlign: 'center',
  },
  earningsValue: {
    fontFamily: fonts.display,
    fontSize: 36,
    color: colors.textOnGold,
    textAlign: 'center',
  },
  earningsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.45)',
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
  },
  earningsBadgeLabel: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.micro,
    color: colors.textOnGold,
  },
  healthCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.accentSoftBg,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: colors.accent,
    padding: spacing.lg,
  },
  healthIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    lineHeight: 19,
    color: colors.textSecondary,
  },
  healthAmount: {
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },
  healthSlogan: {
    fontFamily: fonts.bold,
    color: colors.accentDeep,
  },
  disclaimer: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    lineHeight: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
