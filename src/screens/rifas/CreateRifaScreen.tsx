import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { CREATE_RIFA_STEPS, useCreateRifaWizard } from '@/application/rifa/useCreateRifaWizard';
import { EmisionStep } from '@/components/rifas/steps/EmisionStep';
import { PremioStep } from '@/components/rifas/steps/PremioStep';
import { ReviewStep } from '@/components/rifas/steps/ReviewStep';
import { AuthShell } from '@/components/shared/AuthShell';
import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayCard } from '@/components/shared/clay/ClayCard';
import { ClayProgressSteps } from '@/components/shared/clay/ClayProgressSteps';
import { createRifaStyles as styles } from '@/styles/rifas/createRifa.styles';
import { colors } from '@/theme';

const STEP_COPY = [
  {
    title: 'Configura tu emisión',
    subtitle: 'Cantidad de boletas, valor y fecha del sorteo.',
  },
  {
    title: 'Define tu premio',
    subtitle: 'La ley exige coherencia entre la emisión y el valor del premio.',
  },
  {
    title: 'Revisa y crea',
    subtitle: 'Tu boleta digital y los números de la rifa.',
  },
] as const;

/** Wizard de creación de rifa (fases 1.1 y 2.2 del PDF). */
export function CreateRifaScreen() {
  const router = useRouter();
  const wizard = useCreateRifaWizard();
  const { step, submit } = wizard.state;

  if (submit.status === 'success') {
    return (
      <AuthShell centerContent>
        <View style={styles.successContainer}>
          <View style={styles.successBadge}>
            <Ionicons name="checkmark" size={44} color={colors.textOnGold} />
          </View>
          <Text style={styles.successTitle}>¡Rifa creada!</Text>
          <ClayCard flat style={styles.successRefCard}>
            <Text style={styles.successRefLabel}>Número de rifa</Text>
            <Text style={styles.successRefValue}>{submit.rifa.id}</Text>
          </ClayCard>
          <Text style={styles.successMessage}>
            Tu rifa quedó en revisión para la autorización de Coljuegos. Te avisaremos cuando esté
            autorizada y publicada en el marketplace de Fortu.
          </Text>
          <ClayButton label="Ver mis rifas" onPress={() => router.back()} />
        </View>
      </AuthShell>
    );
  }

  const copy = STEP_COPY[step];
  const isLastStep = step === CREATE_RIFA_STEPS.length - 1;

  return (
    <AuthShell
      title={copy.title}
      subtitle={copy.subtitle}
      onBack={step === 0 ? () => router.back() : wizard.goBack}
      heroAccessory={<ClayProgressSteps current={step} total={CREATE_RIFA_STEPS.length} />}
    >
      {step === 0 ? <EmisionStep wizard={wizard} /> : null}
      {step === 1 ? <PremioStep wizard={wizard} /> : null}
      {step === 2 ? <ReviewStep wizard={wizard} /> : null}

      <View style={styles.footer}>
        <ClayButton
          label={isLastStep ? 'Crear rifa' : 'Continuar'}
          onPress={isLastStep ? wizard.submit : wizard.goNext}
          loading={submit.status === 'submitting'}
        />
      </View>
    </AuthShell>
  );
}
