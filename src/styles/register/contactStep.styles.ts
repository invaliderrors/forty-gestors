import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, spacing } from '@/theme';

export const contactStepStyles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  sectionLabel: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
});
