import { StyleSheet } from 'react-native';

import { clayShadow, colors, fonts, fontSizes, spacing } from '@/theme';

export const welcomeViewStyles = StyleSheet.create({
  container: {
    gap: spacing.xxl,
    alignItems: 'stretch',
  },
  badge: {
    alignSelf: 'center',
    width: 104,
    height: 104,
    borderRadius: 34,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 6,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
    ...clayShadow.goldCta,
  },
  textBlock: {
    gap: spacing.md,
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
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  note: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 19,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
