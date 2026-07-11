import { StyleSheet } from 'react-native';

import { colors, radii, spacing } from '@/theme';

export const clayCardStyles = StyleSheet.create({
  shell: {
    borderRadius: radii.xxl,
    backgroundColor: colors.surfaceDepth,
  },
  face: {
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: spacing.xl,
    marginBottom: 4,
  },
});
