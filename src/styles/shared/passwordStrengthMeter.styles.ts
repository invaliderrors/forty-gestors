import { StyleSheet } from 'react-native';

import { fonts, fontSizes, radii, spacing } from '@/theme';

export const passwordStrengthMeterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  track: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.xs,
  },
  segment: {
    flex: 1,
    height: 6,
    borderRadius: radii.pill,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    width: 72,
    textAlign: 'right',
  },
});
