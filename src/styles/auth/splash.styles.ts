import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

const HALO_SIZE = 280;

export const splashStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.heroBase,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxxl,
  },
  haloArea: {
    width: HALO_SIZE,
    height: HALO_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wordmark: {
    width: 150,
    height: 56,
  },
});
