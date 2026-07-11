import { StyleSheet } from 'react-native';

import { colors } from '@/theme';

export const lightBackgroundStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.surface,
  },
  blob: {
    position: 'absolute',
  },
  gold: {
    top: -100,
    right: -90,
  },
  cyan: {
    bottom: -150,
    left: -130,
  },
});
