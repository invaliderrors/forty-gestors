import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const rifasScreenStyles = StyleSheet.create({
  list: {
    gap: spacing.lg,
  },
  loading: {
    paddingVertical: spacing.xxxl,
    alignItems: 'center',
  },
  empty: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xl,
  },
  emptyBubble: {
    width: 72,
    height: 72,
    borderRadius: radii.xl,
    backgroundColor: colors.goldSoftBg,
    borderBottomWidth: 4,
    borderBottomColor: colors.ctaFace,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
  },
  emptyMessage: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
