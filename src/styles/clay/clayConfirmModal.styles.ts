import { StyleSheet } from 'react-native';

import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const clayConfirmModalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(4,8,15,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.surface,
    borderRadius: radii.xxl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderBottomWidth: 5,
    borderBottomColor: colors.surfaceDepth,
    padding: spacing.xxl,
    alignItems: 'center',
    gap: spacing.md,
    ...clayShadow.floating,
  },
  iconBubble: {
    width: 56,
    height: 56,
    borderRadius: radii.lg,
    backgroundColor: colors.dangerSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.title,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  message: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actions: {
    alignSelf: 'stretch',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  dangerButton: {
    borderRadius: radii.xl,
    backgroundColor: colors.danger,
    borderBottomWidth: 5,
    borderBottomColor: '#B91C1C',
    paddingVertical: 15,
    alignItems: 'center',
  },
  dangerPressed: {
    opacity: 0.8,
  },
  dangerLabel: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    color: colors.surface,
  },
});
