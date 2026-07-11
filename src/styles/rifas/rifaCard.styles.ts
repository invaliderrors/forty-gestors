import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const rifaCardStyles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  cardPressed: {
    opacity: 0.8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  name: {
    flex: 1,
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  statusChipRevision: {
    backgroundColor: colors.goldSoftBg,
  },
  statusChipOk: {
    backgroundColor: colors.successSoftBg,
  },
  statusLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
  },
  statusLabelRevision: {
    color: colors.ctaDepth,
  },
  statusLabelOk: {
    color: colors.successDeep,
  },
  prizeSummary: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceSunken,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  metaLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.textSecondary,
  },
  progressTrack: {
    height: 7,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceSunken,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radii.pill,
    backgroundColor: colors.ctaFace,
  },
  progressLabel: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.micro,
    color: colors.textMuted,
  },
});
