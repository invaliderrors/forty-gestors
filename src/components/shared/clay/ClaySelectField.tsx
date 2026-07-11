import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { claySelectFieldStyles as styles } from '@/styles/clay/claySelectField.styles';
import { colors } from '@/theme';

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
