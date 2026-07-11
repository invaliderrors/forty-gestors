import { StyleSheet } from 'react-native';

import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const ticketPreviewStyles = StyleSheet.create({
  ticket: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: colors.ctaFace,
    borderBottomWidth: 5,
    borderBottomColor: colors.ctaDepth,
    overflow: 'hidden',
    ...clayShadow.raised,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.goldSoftBg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerLabel: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.micro,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.ctaDepth,
  },
  body: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  name: {
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
  },
  prizeList: {
    gap: 6,
    marginTop: 2,
  },
  prizeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  prizeIcon: {
    marginTop: 2,
  },
  prizeText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  prizeValue: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.caption,
    color: colors.textPrimary,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  detailBlock: {
    gap: 1,
  },
  detailLabel: {
    fontFamily: fonts.semibold,
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  detailValue: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.caption,
    color: colors.textPrimary,
  },
  perforation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
  },
  perforationDot: {
    flex: 1,
    height: 1.5,
    backgroundColor: colors.surfaceDepth,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sampleNumber: {
    fontFamily: fonts.display,
    fontSize: fontSizes.subtitle,
    letterSpacing: 2,
    color: colors.textPrimary,
  },
  sealBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.ctaDepth,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    backgroundColor: colors.goldSoftBg,
  },
  sealLabel: {
    fontFamily: fonts.bold,
    fontSize: 8.5,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.ctaDepth,
    maxWidth: 150,
  },
});
