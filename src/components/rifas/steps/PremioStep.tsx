import { Text, View } from 'react-native';

import type { CreateRifaWizard } from '@/application/rifa/useCreateRifaWizard';
import { PrizeForm } from '@/components/rifas/PrizeForm';
import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { createRifaStepsStyles as styles } from '@/styles/rifas/createRifaSteps.styles';

type PremioStepProps = {
  wizard: CreateRifaWizard;
};

/**
 * Paso 2: plan de premios (fase 2.2 del PDF). Admite varios premios —
 * el primero siempre es el principal y debe ser el de mayor valor.
 */
export function PremioStep({ wizard }: PremioStepProps) {
  const { prizes } = wizard.state;
  const errors = wizard.visibleErrors;

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>
        Puedes rifar más de un premio (ej: un carro y una moto). El primero es el principal.
      </Text>

      {prizes.map((prize, index) => (
        <PrizeForm key={index} index={index} prize={prize} wizard={wizard} />
      ))}

      {errors.prizePlanTotal ? <ClayNotice tone="error" message={errors.prizePlanTotal} /> : null}

      <ClayButton label="Agregar otro premio" variant="secondary" onPress={wizard.addPrize} />
    </View>
  );
}
