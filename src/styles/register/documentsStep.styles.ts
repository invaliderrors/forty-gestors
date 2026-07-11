import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, spacing } from '@/theme';

export const documentsStepStyles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  intro: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 21,
    color: colors.textSecondary,
  },
});
