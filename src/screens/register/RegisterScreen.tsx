import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { useRegisterWizard, WIZARD_STEPS } from '@/application/registration/useRegisterWizard';
import { RegisterSuccess } from '@/components/register/RegisterSuccess';
import { ContactStep } from '@/components/register/steps/ContactStep';
import { DocumentsStep } from '@/components/register/steps/DocumentsStep';
import { IdentityStep } from '@/components/register/steps/IdentityStep';
import { SecurityStep } from '@/components/register/steps/SecurityStep';
import { AuthShell } from '@/components/shared/AuthShell';
import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayProgressSteps } from '@/components/shared/clay/ClayProgressSteps';
import { spacing } from '@/theme';

const STEP_COPY = [
  {
    title: 'Cuéntanos de ti',
    subtitle: 'Con estos datos registramos tu operación ante Coljuegos.',
  },
  {
    title: '¿Dónde te ubicamos?',
    subtitle: 'Dirección de notificación y datos de contacto.',
  },
  {
    title: 'Verifica tu identidad',
    subtitle: 'Los documentos que exige la norma para operar rifas legales.',
  },
  {
    title: 'Asegura tu cuenta',
    subtitle: 'Último paso: tu contraseña de acceso.',
  },
] as const;

export function RegisterScreen() {
  const router = useRouter();
  const wizard = useRegisterWizard();
  const { step, submit } = wizard.state;

  if (submit.status === 'success') {
    return (
      <AuthShell title="Registro completado" subtitle="Bienvenido al ecosistema Fortu.">
        <RegisterSuccess
          registrationId={submit.result.registrationId}
          onGoToLogin={() => router.replace('/login')}
        />
      </AuthShell>
    );
  }

  const copy = STEP_COPY[step];
  const isLastStep = step === WIZARD_STEPS.length - 1;

  return (
    <AuthShell
      title={copy.title}
      subtitle={copy.subtitle}
      onBack={step === 0 ? () => router.back() : wizard.goBack}
      heroAccessory={<ClayProgressSteps current={step} total={WIZARD_STEPS.length} />}
    >
      {step === 0 ? <IdentityStep wizard={wizard} /> : null}
      {step === 1 ? <ContactStep wizard={wizard} /> : null}
      {step === 2 ? <DocumentsStep wizard={wizard} /> : null}
      {step === 3 ? <SecurityStep wizard={wizard} /> : null}

      <View style={styles.footer}>
        <ClayButton
          label={isLastStep ? 'Enviar solicitud' : 'Continuar'}
          onPress={isLastStep ? wizard.submit : wizard.goNext}
          loading={submit.status === 'submitting'}
        />
      </View>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: spacing.sm,
  },
});
