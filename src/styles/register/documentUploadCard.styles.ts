import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const documentUploadCardStyles = StyleSheet.create({
  container: {
    gap: 6,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radii.xl,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 2,
  },
  cardEmpty: {
    borderStyle: 'dashed',
    borderColor: colors.inputBorder,
  },
  cardAnalyzing: {
    borderColor: colors.accent,
  },
  cardApproved: {
    borderColor: colors.success,
  },
  cardRejected: {
    borderColor: colors.danger,
  },
  cardError: {
    borderColor: colors.inputBorderError,
  },
  cardPressed: {
    opacity: 0.8,
  },
  uploadBubble: {
    width: 48,
    height: 48,
    borderRadius: radii.lg,
    backgroundColor: colors.accentSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceSunken,
  },
  pdfBadge: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.accentSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfLabel: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: colors.accentDeep,
  },
  body: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    gap: 2,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  requiredMark: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.body,
    color: colors.danger,
  },
  hint: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  accepts: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.accentDeep,
    marginTop: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  analyzingTag: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.accentDeep,
  },
  approvedTag: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.successDeep,
  },
  rejectedTag: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.danger,
  },
  rejectedReason: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  retryHint: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.accentDeep,
    marginTop: 2,
  },
  note: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    lineHeight: 15,
    color: colors.textMuted,
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.danger,
    marginLeft: spacing.xs,
  },
});
