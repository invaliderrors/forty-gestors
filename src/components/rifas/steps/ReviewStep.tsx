import { Text, View } from 'react-native';

import type { CreateRifaWizard } from '@/application/rifa/useCreateRifaWizard';
import { TicketPreview } from '@/components/rifas/TicketPreview';
import { ClayCard } from '@/components/shared/clay/ClayCard';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { prizeSummary, totalPrizeValue, type RifaPrize } from '@/domain/rifa/types';
import { OTHER_BRAND } from '@/domain/rifa/vehicles';
import { formatCop } from '@/domain/shared/money';
import { createRifaStepsStyles as styles } from '@/styles/rifas/createRifaSteps.styles';

type ReviewStepProps = {
  wizard: CreateRifaWizard;
};

/** Paso 3: revisión — ticket digital de muestra + plan de premios + números. */
export function ReviewStep({ wizard }: ReviewStepProps) {
  const { emision, prizes, submit } = wizard.state;
  const projection = wizard.projection;

  const plan: RifaPrize[] = prizes.map((prize) => ({
    category: prize.category ?? 'otro',
    vehicleType: prize.vehicleType || undefined,
    brand:
      (prize.brand === OTHER_BRAND ? prize.brandOther : prize.brand).trim() || undefined,
    model: prize.model || undefined,
    year: prize.year || undefined,
    color: prize.color || undefined,
    city: prize.city || undefined,
    description: prize.description || undefined,
    commercialValue: Number.parseInt(prize.commercialValueRaw, 10) || 0,
    swornDeclaration: prize.swornAccepted,
  }));
  const totalValue = totalPrizeValue(plan);

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>
        Así se verá la boleta digital de tu rifa. Revisa que todo esté bien antes de enviarla.
      </Text>

      {submit.status === 'error' ? <ClayNotice tone="error" message={submit.message} /> : null}

      <TicketPreview
        name={emision.name}
        prizes={plan}
        ticketPrice={Number.parseInt(emision.ticketPriceRaw, 10) || 0}
        drawDateDisplay={emision.drawDateRaw}
      />

      <Text style={styles.sectionLabel}>Plan de premios</Text>
      <ClayCard style={styles.summaryCard}>
        {plan.map((prize, index) => (
          <View key={index}>
            {index > 0 ? <View style={styles.summaryDivider} /> : null}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel} numberOfLines={2}>
                {index === 0 ? '🏆 ' : ''}
                {prizeSummary(prize) || 'Premio'}
              </Text>
              <Text style={styles.summaryValue}>{formatCop(prize.commercialValue)}</Text>
            </View>
          </View>
        ))}
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Valor total de premios</Text>
          <Text style={styles.summaryValue}>{formatCop(totalValue)}</Text>
        </View>
      </ClayCard>

      {projection ? (
        <>
          <Text style={styles.sectionLabel}>Tus números</Text>
          <ClayCard style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Emisión total</Text>
              <Text style={styles.summaryValue}>{formatCop(projection.emissionTotal)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Derechos de explotación</Text>
              <Text style={styles.summaryValue}>{formatCop(projection.explotacionRights)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Póliza de cumplimiento (aprox.)</Text>
              <Text style={styles.summaryValue}>{formatCop(projection.insuranceCost)}</Text>
            </View>
          </ClayCard>
        </>
      ) : null}

      <ClayNotice
        tone="info"
        message="Al crearla, tu rifa queda en revisión para la autorización de Coljuegos. Cuando esté autorizada se publicará en el marketplace de Fortu."
      />
    </View>
  );
}
