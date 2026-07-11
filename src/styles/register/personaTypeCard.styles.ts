import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const personaTypeCardStyles = StyleSheet.create({
  shell: {
    borderRadius: radii.xxl,
    backgroundColor: colors.surfaceDepth,
  },
  face: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: spacing.xl,
    marginBottom: 5,
  },
  facePressed: {
    marginBottom: 2,
    transform: [{ translateY: 3 }],
  },
  iconBubble: {
    width: 54,
    height: 54,
    borderRadius: radii.lg,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 3,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  requirements: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.accentDeep,
    marginTop: 2,
  },
});
