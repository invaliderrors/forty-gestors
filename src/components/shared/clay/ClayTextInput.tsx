import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
} from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

type ClayTextInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  error?: string;
  helper?: string;
  maxLength?: number;
  icon?: keyof typeof Ionicons.glyphMap;
  autoComplete?: 'email' | 'password' | 'password-new' | 'name' | 'tel' | 'street-address' | 'off';
};

/** Input claymórfico hundido: fondo azulado en reposo, blanco + halo cyan al foco. */
export function ClayTextInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize = 'sentences',
  secureTextEntry = false,
  error,
  helper,
  maxLength,
  icon,
  autoComplete,
}: ClayTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecretVisible, setIsSecretVisible] = useState(false);

  const borderColor = error
    ? colors.inputBorderError
    : isFocused
      ? colors.inputBorderFocused
      : colors.inputBorder;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.field,
          { borderColor, backgroundColor: isFocused ? colors.inputBgFocused : colors.inputBg },
        ]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={19}
            color={isFocused ? colors.accentDeep : colors.textMuted}
            style={styles.icon}
          />
        ) : null}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.inputPlaceholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry && !isSecretVisible}
          maxLength={maxLength}
          autoComplete={autoComplete}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityLabel={label}
        />
        {secureTextEntry ? (
          <Pressable
            onPress={() => setIsSecretVisible((current) => !current)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={isSecretVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            <Ionicons
              name={isSecretVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : helper ? (
        <Text style={styles.helper}>{helper}</Text>
      ) : null}
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
    borderRadius: radii.lg,
    paddingHorizontal: spacing.lg,
    minHeight: 52,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
    paddingVertical: 12,
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    color: colors.danger,
    marginLeft: spacing.xs,
  },
  helper: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    color: colors.textMuted,
    marginLeft: spacing.xs,
  },
});
