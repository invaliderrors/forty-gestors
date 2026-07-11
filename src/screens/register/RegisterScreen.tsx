import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { useRegisterWizard, WIZARD_STEPS } from '@/application/registration/useRegisterWizard';
import { OtpVerification } from '@/components/register/OtpVerification';
import { WelcomeView } from '@/components/register/WelcomeView';
import { ContactStep } from '@/components/register/steps/ContactStep';
import { DocumentsStep } from '@/components/register/steps/DocumentsStep';
import { IdentityStep } from '@/components/register/steps/IdentityStep';
import { SecurityStep } from '@/components/register/steps/SecurityStep';
import { AuthShell } from '@/components/shared/AuthShell';
import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayProgressSteps } from '@/components/shared/clay/ClayProgressSteps';
import type { PersonaType } from '@/domain/registration/types';
import { spacing } from '@/theme';

const STEP_COPY: Record<PersonaType, { title: string; subtitle: string }[]> = {
  natural: [
    {
      title: 'Cuéntanos de ti',
      subtitle: 'Con estos datos registramos tu operación.',
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
  ],
  juridica: [
    {
      title: 'Datos de tu empresa',
      subtitle: 'Con estos datos registramos la operación de tu empresa.',
    },
    {
      title: '¿Dónde los ubicamos?',
      subtitle: 'Dirección de notificación y datos de contacto.',
    },
    {
      title: 'Verifica la empresa',
      subtitle: 'Los documentos que exige la norma para operar rifas legales.',
    },
    {
      title: 'Asegura tu cuenta',
      subtitle: 'Último paso: tu contraseña de acceso.',
    },
  ],
};

type RegisterScreenProps = {
  personaType: PersonaType;
};

export function RegisterScreen({ personaType }: RegisterScreenProps) {
  const router = useRouter();
  const wizard = useRegisterWizard(personaType);
  const { step, submit, phase, registration, otp, identity } = wizard.state;

  if (phase === 'verification' && registration) {
    return (
      <AuthShell
        title="Revisa tu correo"
        subtitle="Te enviamos un código para confirmar que eres tú."
        centerContent
      >
        <OtpVerification
          email={registration.email}
          checking={otp.status === 'checking'}
          errorMessage={otp.status === 'error' ? otp.message : null}
          onVerify={(code) => void wizard.verifyCode(code)}
          onResend={wizard.resendCode}
        />
      </AuthShell>
    );
  }

  if (phase === 'welcome') {
    return (
      <AuthShell centerContent>
        <WelcomeView
          displayName={personaType === 'natural' ? identity.fullName : identity.razonSocial}
          onContinue={() =>
            router.replace({
              pathname: '/home',
              params: { solicitud: registration?.registrationId ?? '' },
            })
          }
        />
      </AuthShell>
    );
  }

  const copy = STEP_COPY[personaType][step];
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
