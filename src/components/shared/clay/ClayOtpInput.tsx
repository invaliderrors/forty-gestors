import { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { clayOtpInputStyles as styles } from '@/styles/clay/clayOtpInput.styles';

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
