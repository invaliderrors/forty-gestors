import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const otpVerificationStyles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  iconBubble: {
    alignSelf: 'center',
    width: 72,
    height: 72,
    borderRadius: radii.lg,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 4,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailHint: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  email: {
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },
  demoHint: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    color: colors.textMuted,
  },
});
