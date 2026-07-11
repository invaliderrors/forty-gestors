import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

/** Estilos compartidos por los tres pasos del wizard de creación de rifa. */
export const createRifaStepsStyles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  sectionLabel: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  intro: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  categoryChip: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
  },
  categoryChipSelected: {
    borderColor: colors.ctaFace,
    backgroundColor: colors.goldSoftBg,
  },
  categoryIcon: {
    width: 38,
    height: 38,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  categoryIconSelected: {
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 2,
    borderBottomColor: colors.ctaDepth,
  },
  categoryLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  categoryLabelSelected: {
    color: colors.textPrimary,
  },
  categoryHint: {
    fontFamily: fonts.regular,
    fontSize: 9.5,
    color: colors.textMuted,
    textAlign: 'center',
  },
  categoryError: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.danger,
    marginLeft: spacing.xs,
  },
  miniProjection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.accentSoftBg,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  miniProjectionText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    lineHeight: 19,
    color: colors.textSecondary,
  },
  miniProjectionStrong: {
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },
  summaryCard: {
    gap: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  summaryLabel: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.caption,
    color: colors.textPrimary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.surfaceBorder,
  },
});
