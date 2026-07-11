import type { PropsWithChildren } from 'react';
import { View, type ViewStyle } from 'react-native';

import { clayCardStyles as styles } from '@/styles/clay/clayCard.styles';
import { clayShadow } from '@/theme';

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
