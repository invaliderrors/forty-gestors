import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const invitationTemplateStyles = StyleSheet.create({
  /** El template vive fuera de pantalla; solo existe para la captura. */
  offscreen: {
    position: 'absolute',
    left: -9999,
    top: 0,
  },
  card: {
    width: 340,
    borderRadius: radii.xxl,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: spacing.xxl,
    alignItems: 'center',
    gap: spacing.lg,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.ctaFace,
    borderRadius: radii.pill,
    borderBottomWidth: 3,
    borderBottomColor: colors.ctaDepth,
    paddingHorizontal: spacing.lg,
    paddingVertical: 5,
  },
  badgeLabel: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.micro,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.textOnGold,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: fontSizes.display,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  message: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  codeCard: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.goldSoftBg,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.ctaFace,
    paddingVertical: spacing.lg,
  },
  codeLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  codeValue: {
    fontFamily: fonts.display,
    fontSize: 38,
    letterSpacing: 8,
    color: colors.textPrimary,
  },
  steps: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 19,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  slogan: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.caption,
    color: colors.accentDeep,
    textAlign: 'center',
  },
});
