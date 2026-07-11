import { Text, View } from 'react-native';

import { clayProgressStepsStyles as styles } from '@/styles/clay/clayProgressSteps.styles';

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
