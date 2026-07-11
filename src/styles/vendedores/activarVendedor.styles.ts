import { StyleSheet } from 'react-native';

import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const activarVendedorStyles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  sellerFound: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.successSoftBg,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: colors.success,
    padding: spacing.lg,
  },
  sellerFoundBody: {
    flex: 1,
  },
  sellerFoundName: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  sellerFoundHint: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
    marginTop: 1,
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
  successNote: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 19,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
