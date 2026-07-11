import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { clayCheckboxStyles as styles } from '@/styles/clay/clayCheckbox.styles';
import { colors } from '@/theme';

type ClayCheckboxProps = {
  checked: boolean;
  onToggle: () => void;
  label: ReactNode;
  error?: string;
};

export function ClayCheckbox({ checked, onToggle, label, error }: ClayCheckboxProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        onPress={onToggle}
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        hitSlop={6}
      >
        <View style={[styles.box, checked && styles.boxChecked, error ? styles.boxError : null]}>
          {checked ? <Ionicons name="checkmark" size={15} color={colors.textOnGold} /> : null}
        </View>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}
