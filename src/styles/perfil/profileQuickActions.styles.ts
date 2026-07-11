import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const profileQuickActionsStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  shell: {
    borderRadius: radii.lg,
    backgroundColor: colors.secondaryDepth,
  },
  face: {
    alignItems: 'center',
    gap: 6,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: 4,
    minWidth: 96,
  },
  facePressed: {
    marginBottom: 1,
    transform: [{ translateY: 3 }],
  },
  iconBubble: {
    width: 34,
    height: 34,
    borderRadius: radii.sm,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 2,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.textPrimary,
  },
});
