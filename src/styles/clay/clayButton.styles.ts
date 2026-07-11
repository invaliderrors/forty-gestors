import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii } from '@/theme';

export const clayButtonStyles = StyleSheet.create({
  shell: {
    borderRadius: radii.xl,
  },
  shellDisabled: {
    opacity: 0.55,
  },
  face: {
    borderRadius: radii.xl,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
    borderTopWidth: 1.5,
    borderTopColor: colors.ctaFaceHighlight,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    letterSpacing: 0.2,
  },
  ghost: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  ghostPressed: {
    opacity: 0.6,
  },
  ghostLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.body,
    color: colors.textLink,
  },
});
