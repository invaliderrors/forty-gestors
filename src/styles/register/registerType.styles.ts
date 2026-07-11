import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, spacing } from '@/theme';

export const registerTypeStyles = StyleSheet.create({
  note: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 19,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
