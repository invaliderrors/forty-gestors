import { Text, View } from 'react-native';

import type { CreateRifaWizard } from '@/application/rifa/useCreateRifaWizard';
import { TicketPreview } from '@/components/rifas/TicketPreview';
import { ClayCard } from '@/components/shared/clay/ClayCard';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import type { PrizeSpec } from '@/domain/rifa/types';
import { formatCop } from '@/domain/shared/money';
import { createRifaStepsStyles as styles } from '@/styles/rifas/createRifaSteps.styles';

type ReviewStepProps = {
  wizard: CreateRifaWizard;
};

/** Paso 3: revisión — ticket digital de muestra + números de la rifa. */
export function ReviewStep({ wizard }: ReviewStepProps) {
  const { emision, premio, submit } = wizard.state;
  const projection = wizard.projection;

  const prize: PrizeSpec = {
    category: premio.category ?? 'otro',
    brand: premio.brand || undefined,
    model: premio.model || undefined,
    year: premio.year || undefined,
    color: premio.color || undefined,
    city: premio.city || undefined,
    description: premio.description || undefined,
    commercialValue: Number.parseInt(premio.commercialValueRaw, 10) || 0,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>
        Así se verá la boleta digital de tu rifa. Revisa que todo esté bien antes de enviarla.
      </Text>

      {submit.status === 'error' ? <ClayNotice tone="error" message={submit.message} /> : null}

      <TicketPreview
        name={emision.name}
        prize={prize}
        ticketPrice={Number.parseInt(emision.ticketPriceRaw, 10) || 0}
        drawDateDisplay={emision.drawDateRaw}
      />

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
              <Text style={styles.summaryLabel}>Valor del premio</Text>
              <Text style={styles.summaryValue}>{formatCop(prize.commercialValue)}</Text>
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
