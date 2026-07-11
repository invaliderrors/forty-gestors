import { StyleSheet } from 'react-native';

import { fonts, fontSizes, radii, spacing } from '@/theme';

export const clayNoticeStyles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  message: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    lineHeight: 18,
  },
});
