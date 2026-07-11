import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

type ClaySelectFieldProps = {
  label: string;
  value: string | null;
  placeholder: string;
  onPress: () => void;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

/** Campo estilo input que abre un ClayPickerSheet. */
export function ClaySelectField({
  label,
  value,
  placeholder,
  onPress,
  error,
  icon,
}: ClaySelectFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityValue={{ text: value ?? placeholder }}
        onPress={onPress}
        style={({ pressed }) => [
          styles.field,
          error ? styles.fieldError : null,
          pressed && styles.fieldPressed,
        ]}
      >
        {icon ? (
          <Ionicons name={icon} size={19} color={colors.textMuted} style={styles.icon} />
        ) : null}
        <Text style={[styles.value, !value && styles.placeholder]} numberOfLines={1}>
          {value ?? placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.textMuted} />
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    borderRadius: radii.lg,
    backgroundColor: colors.inputBg,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
  },
  fieldError: {
    borderColor: colors.inputBorderError,
  },
  fieldPressed: {
    backgroundColor: colors.inputBgFocused,
  },
  icon: {
    marginRight: spacing.sm,
  },
  value: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  placeholder: {
    color: colors.inputPlaceholder,
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.danger,
    marginLeft: spacing.xs,
  },
});
