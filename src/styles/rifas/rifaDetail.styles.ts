import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const rifaDetailStyles = StyleSheet.create({
  loading: {
    paddingVertical: spacing.xxxl,
    alignItems: 'center',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    padding: spacing.lg,
  },
  statusCardRevision: {
    backgroundColor: colors.goldSoftBg,
    borderColor: colors.ctaFace,
  },
  statusCardOk: {
    backgroundColor: colors.successSoftBg,
    borderColor: colors.success,
  },
  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIconRevision: {
    backgroundColor: colors.ctaFace,
  },
  statusIconOk: {
    backgroundColor: colors.success,
  },
  statusBody: {
    flex: 1,
  },
  statusTitle: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
  },
  statusText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 18,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionLabel: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  salesCard: {
    gap: spacing.md,
  },
  salesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  salesTitle: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  salesCount: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.body,
    color: colors.accentDeep,
  },
  progressTrack: {
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceSunken,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radii.pill,
    backgroundColor: colors.ctaFace,
  },
  salesHint: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    color: colors.textMuted,
  },
  numbersCard: {
    gap: spacing.md,
  },
  numbersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  numbersLabel: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
  },
  numbersValue: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.caption,
    color: colors.textPrimary,
  },
  numbersDivider: {
    height: 1,
    backgroundColor: colors.surfaceBorder,
  },
});
