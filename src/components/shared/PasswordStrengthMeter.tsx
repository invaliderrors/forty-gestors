import { StyleSheet, Text, View } from 'react-native';

import { scorePassword } from '@/domain/registration/validators';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

const LEVELS = [
  { label: 'Muy débil', color: colors.danger },
  { label: 'Débil', color: colors.danger },
  { label: 'Aceptable', color: colors.ctaDepth },
  { label: 'Fuerte', color: colors.success },
  { label: 'Muy fuerte', color: colors.successDeep },
] as const;

type PasswordStrengthMeterProps = {
  password: string;
};

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  if (password.length === 0) {
    return null;
  }
  const score = scorePassword(password);
  const level = LEVELS[score];

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        {LEVELS.slice(1).map((_, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              { backgroundColor: index < score ? level.color : colors.surfaceDepth },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.label, { color: level.color }]}>{level.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  track: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.xs,
  },
  segment: {
    flex: 1,
    height: 6,
    borderRadius: radii.pill,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    width: 72,
    textAlign: 'right',
  },
});
