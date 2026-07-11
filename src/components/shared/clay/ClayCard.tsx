import type { PropsWithChildren } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { clayShadow, colors, radii, spacing } from '@/theme';

type ClayCardProps = PropsWithChildren<{
  style?: ViewStyle;
  /** `flat` quita la sombra exterior (para cards anidadas). */
  flat?: boolean;
}>;

/** Superficie clay blanca con labio de profundidad inferior. */
export function ClayCard({ children, style, flat = false }: ClayCardProps) {
  return (
    <View style={[styles.shell, !flat && clayShadow.raised]}>
      <View style={[styles.face, style]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
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
