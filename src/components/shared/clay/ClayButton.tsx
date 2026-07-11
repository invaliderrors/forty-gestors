import { Pressable, Text, View } from 'react-native';

import { LoadingDots } from '@/components/shared/LoadingDots';
import { clayButtonStyles as styles } from '@/styles/clay/clayButton.styles';
import { clayDepth, clayShadow, colors } from '@/theme';

type ClayButtonVariant = 'primary' | 'secondary' | 'ghost';

type ClayButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ClayButtonVariant;
  loading?: boolean;
  disabled?: boolean;
};

/**
 * Botón claymórfico: cara elevada sobre un labio de profundidad que se
 * hunde al presionar. `primary` es el CTA dorado de marca.
 */
export function ClayButton({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
}: ClayButtonProps) {
  const isInactive = disabled || loading;

  if (variant === 'ghost') {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        disabled={isInactive}
        hitSlop={8}
        style={({ pressed }) => [styles.ghost, (pressed || isInactive) && styles.ghostPressed]}
      >
        <Text style={styles.ghostLabel}>{label}</Text>
      </Pressable>
    );
  }

  const face = variant === 'primary' ? colors.ctaFace : colors.secondaryFace;
  const depth = variant === 'primary' ? colors.ctaDepth : colors.secondaryDepth;
  const labelColor = variant === 'primary' ? colors.ctaText : colors.secondaryText;
  const shadow = variant === 'primary' ? clayShadow.goldCta : clayShadow.raised;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isInactive, busy: loading }}
      onPress={onPress}
      disabled={isInactive}
    >
      {({ pressed }) => {
        const sunk = pressed && !isInactive;
        const lip = sunk ? clayDepth.buttonPressed : clayDepth.button;
        return (
          <View
            style={[
              styles.shell,
              { backgroundColor: depth },
              !sunk && shadow,
              isInactive && styles.shellDisabled,
            ]}
          >
            <View
              style={[
                styles.face,
                {
                  backgroundColor: face,
                  marginBottom: lip,
                  transform: [{ translateY: sunk ? clayDepth.button - lip : 0 }],
                },
              ]}
            >
              {loading ? (
                <LoadingDots color={labelColor} />
              ) : (
                <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
              )}
            </View>
          </View>
        );
      }}
    </Pressable>
  );
}
