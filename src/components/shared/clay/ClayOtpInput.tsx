import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, fonts, radii, spacing } from '@/theme';

type ClayOtpInputProps = {
  value: string;
  onChange: (code: string) => void;
  length?: number;
  disabled?: boolean;
  hasError?: boolean;
};

/**
 * Input de código OTP: casillas clay que reflejan un TextInput invisible
 * (un solo input real = pegado desde el teclado y autofill funcionan).
 */
export function ClayOtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  hasError = false,
}: ClayOtpInputProps) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const digits = value.split('');
  const activeIndex = Math.min(value.length, length - 1);

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      accessibilityLabel="Código de verificación"
      disabled={disabled}
    >
      <View style={styles.row}>
        {Array.from({ length }, (_, index) => {
          const isActive = isFocused && index === activeIndex && value.length < length;
          return (
            <View
              key={index}
              style={[
                styles.cell,
                hasError && styles.cellError,
                isActive && styles.cellActive,
                digits[index] !== undefined && styles.cellFilled,
              ]}
            >
              <Text style={styles.digit}>{digits[index] ?? ''}</Text>
            </View>
          );
        })}
      </View>
      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        value={value}
        onChangeText={(text) => onChange(text.replace(/[^\d]/g, '').slice(0, length))}
        keyboardType="number-pad"
        maxLength={length}
        autoComplete="one-time-code"
        textContentType="oneTimeCode"
        caretHidden
        editable={!disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  cell: {
    width: 48,
    height: 58,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderBottomColor: colors.surfaceDepth,
  },
  cellFilled: {
    backgroundColor: colors.surface,
    borderColor: colors.ctaFace,
    borderBottomColor: colors.ctaDepth,
  },
  cellActive: {
    borderColor: colors.inputBorderFocused,
    backgroundColor: colors.surface,
  },
  cellError: {
    borderColor: colors.inputBorderError,
  },
  digit: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: colors.textPrimary,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
