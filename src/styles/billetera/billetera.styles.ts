import { StyleSheet } from 'react-native';

import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const billeteraStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingHorizontal: spacing.xxl,
    gap: spacing.xl,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
    marginTop: 1,
  },
  loading: {
    paddingVertical: spacing.xxxl,
    alignItems: 'center',
  },
  hero: {
    backgroundColor: colors.ctaFace,
    borderRadius: radii.xxl,
    borderBottomWidth: 6,
    borderBottomColor: colors.ctaDepth,
    padding: spacing.xxl,
    gap: spacing.sm,
    ...clayShadow.goldCta,
  },
  heroLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: 'rgba(10,25,49,0.75)',
  },
  heroValue: {
    fontFamily: fonts.display,
    fontSize: 34,
    color: colors.textOnGold,
  },
  heroSplitRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.xs,
  },
  heroSplitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  heroSplitLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: 'rgba(10,25,49,0.8)',
  },
  sectionLabel: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  reconciliationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  reconciliationIcon: {
    width: 38,
    height: 38,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reconciliationIconOk: {
    backgroundColor: colors.successSoftBg,
  },
  reconciliationIconPending: {
    backgroundColor: colors.goldSoftBg,
  },
  reconciliationBody: {
    flex: 1,
    gap: 1,
  },
  reconciliationTitle: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.textPrimary,
  },
  reconciliationHint: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    color: colors.textSecondary,
  },
  reconciliationValue: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.caption,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceBorder,
  },
  movementsList: {
    marginTop: -spacing.sm,
  },
  emptyMovements: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
});
