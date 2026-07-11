import { StyleSheet } from 'react-native';

import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const invitarVendedorStyles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  sectionLabel: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  permissionBox: {
    gap: spacing.lg,
    backgroundColor: colors.surfaceSunken,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: colors.surfaceBorder,
    padding: spacing.lg,
  },
  permissionError: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.danger,
    marginLeft: spacing.xs,
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
  codeCard: {
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.goldSoftBg,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.ctaFace,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  codeLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  codeValue: {
    fontFamily: fonts.display,
    fontSize: 32,
    letterSpacing: 6,
    color: colors.textPrimary,
  },
});
