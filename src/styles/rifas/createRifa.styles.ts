import { StyleSheet } from 'react-native';

import { clayShadow, colors, fonts, fontSizes, spacing } from '@/theme';

export const createRifaStyles = StyleSheet.create({
  footer: {
    marginTop: spacing.sm,
  },
  successContainer: {
    gap: spacing.xl,
    alignItems: 'stretch',
  },
  successBadge: {
    alignSelf: 'center',
    width: 96,
    height: 96,
    borderRadius: 32,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 6,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
    ...clayShadow.goldCta,
  },
  successTitle: {
    fontFamily: fonts.display,
    fontSize: fontSizes.display,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  successMessage: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  successRefCard: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  successRefLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  successRefValue: {
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
    letterSpacing: 1,
    color: colors.textPrimary,
  },
});
