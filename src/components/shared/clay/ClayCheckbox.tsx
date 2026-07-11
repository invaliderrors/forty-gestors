import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

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

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  rowPressed: {
    opacity: 0.75,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: radii.sm - 4,
    borderWidth: 2,
    borderColor: colors.inputBorder,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  boxChecked: {
    backgroundColor: colors.ctaFace,
    borderColor: colors.ctaDepth,
  },
  boxError: {
    borderColor: colors.inputBorderError,
  },
  label: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    lineHeight: 19,
    color: colors.textSecondary,
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.danger,
    marginLeft: 36,
  },
});
