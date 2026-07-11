import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import type { CreateRifaWizard } from '@/application/rifa/useCreateRifaWizard';
import { ClayTextInput } from '@/components/shared/clay/ClayTextInput';
import { maskDrawDateInput } from '@/domain/rifa/validators';
import { formatCop, formatThousands } from '@/domain/shared/money';
import { createRifaStepsStyles as styles } from '@/styles/rifas/createRifaSteps.styles';
import { colors } from '@/theme';

type EmisionStepProps = {
  wizard: CreateRifaWizard;
};

/** Paso 1: parámetros de la emisión (base del recaudo, fase 1.1 del PDF). */
export function EmisionStep({ wizard }: EmisionStepProps) {
  const { emision } = wizard.state;
  const errors = wizard.visibleErrors;

  return (
    <View style={styles.container}>
      <ClayTextInput
        label="Nombre de la rifa"
        value={emision.name}
        onChangeText={(value) => wizard.setEmision('name', value)}
        placeholder="Ej: Gran rifa Renault Logan 2026"
        autoCapitalize="sentences"
        icon="megaphone-outline"
        error={errors.name}
      />
      <ClayTextInput
        label="Cantidad total de boletas"
        value={formatThousands(emision.ticketCountRaw)}
        onChangeText={(value) =>
          wizard.setEmision('ticketCountRaw', value.replace(/\D/g, '').slice(0, 7))
        }
        placeholder="Ej: 9.999"
        keyboardType="number-pad"
        icon="pricetags-outline"
        error={errors.ticketCount}
        helper="Número exacto de unidades a expedir para el sorteo."
      />
      <ClayTextInput
        label="Valor por boleta"
        value={formatThousands(emision.ticketPriceRaw)}
        onChangeText={(value) =>
          wizard.setEmision('ticketPriceRaw', value.replace(/\D/g, '').slice(0, 9))
        }
        placeholder="Ej: 10.000"
        keyboardType="number-pad"
        icon="cash-outline"
        error={errors.ticketPrice}
        helper="Precio de venta al público por cada número."
      />
      <ClayTextInput
        label="Fecha del sorteo"
        value={emision.drawDateRaw}
        onChangeText={(value) => wizard.setEmision('drawDateRaw', maskDrawDateInput(value))}
        placeholder="DD/MM/AAAA"
        keyboardType="number-pad"
        maxLength={10}
        icon="calendar-outline"
        error={errors.drawDate}
      />

      {wizard.projection ? (
        <View style={styles.miniProjection}>
          <Ionicons name="calculator-outline" size={20} color={colors.accentDeep} />
          <Text style={styles.miniProjectionText}>
            Emisión total:{' '}
            <Text style={styles.miniProjectionStrong}>
              {formatCop(wizard.projection.emissionTotal)}
            </Text>
            {'\n'}Tu premio no puede valer menos de{' '}
            <Text style={styles.miniProjectionStrong}>
              {formatCop(wizard.projection.prizeMinimum)}
            </Text>
            .
          </Text>
        </View>
      ) : null}
    </View>
  );
}
