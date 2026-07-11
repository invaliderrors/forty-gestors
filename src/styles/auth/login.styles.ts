import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, spacing } from '@/theme';

export const loginStyles = StyleSheet.create({
  logoRow: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  card: {
    gap: spacing.lg,
  },
  registerBlock: {
    gap: spacing.md,
  },
  registerHint: {
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textSecondary,
  },
  demoHint: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    color: colors.textMuted,
  },
});
