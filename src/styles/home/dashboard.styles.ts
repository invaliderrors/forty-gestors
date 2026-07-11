import { StyleSheet } from 'react-native';

import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const dashboardStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingHorizontal: spacing.xxl,
    gap: spacing.xl,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: radii.pill,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 3,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
    ...clayShadow.subtle,
  },
  greetingBlock: {
    flex: 1,
  },
  greetingEyebrow: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
  },
  greetingName: {
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
    marginTop: -2,
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.surfaceBorder,
    borderBottomWidth: 4,
    borderBottomColor: colors.surfaceDepth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellPressed: {
    opacity: 0.65,
  },
  heroSubtitle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 22,
    color: colors.textSecondary,
    marginTop: -spacing.sm,
  },
});
