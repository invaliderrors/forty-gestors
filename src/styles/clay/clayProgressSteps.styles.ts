import { StyleSheet } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

export const clayProgressStepsStyles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  caption: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.textOnNavySoft,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  track: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  pill: {
    flex: 1,
    height: 7,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  pillDone: {
    backgroundColor: colors.accent,
  },
  pillActive: {
    backgroundColor: colors.ctaFace,
  },
});
