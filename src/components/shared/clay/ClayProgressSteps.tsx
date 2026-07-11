import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

type ClayProgressStepsProps = {
  current: number;
  total: number;
};

/** Progreso del wizard sobre fondo navy: "Paso X de Y" + pills. */
export function ClayProgressSteps({ current, total }: ClayProgressStepsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>
        Paso {current + 1} de {total}
      </Text>
      <View style={styles.track}>
        {Array.from({ length: total }, (_, index) => (
          <View
            key={index}
            style={[
              styles.pill,
              index < current && styles.pillDone,
              index === current && styles.pillActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  caption: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.textOnNavySoft,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  track: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  pill: {
    flex: 1,
    height: 7,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  pillDone: {
    backgroundColor: colors.accent,
  },
  pillActive: {
    backgroundColor: colors.ctaFace,
  },
});
