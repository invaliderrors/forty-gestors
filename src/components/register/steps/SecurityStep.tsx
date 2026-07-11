import { Text, View } from 'react-native';

import type { RegisterWizard } from '@/application/registration/useRegisterWizard';
import { ClayCheckbox } from '@/components/shared/clay/ClayCheckbox';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { ClayTextInput } from '@/components/shared/clay/ClayTextInput';
import { PasswordStrengthMeter } from '@/components/shared/PasswordStrengthMeter';
import { securityStepStyles as styles } from '@/styles/register/securityStep.styles';

type SecurityStepProps = {
  wizard: RegisterWizard;
};

/** Paso 4: contraseña y aceptación de términos. */
export function SecurityStep({ wizard }: SecurityStepProps) {
  const { security, submit } = wizard.state;
  const errors = wizard.visibleErrors;

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>Crea la contraseña con la que entrarás a Fortu Gestor.</Text>

      {submit.status === 'error' ? <ClayNotice tone="error" message={submit.message} /> : null}

      <ClayTextInput
        label="Contraseña"
        value={security.password}
        onChangeText={(value) => wizard.setSecurity('password', value)}
        placeholder="Mínimo 8 caracteres"
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password-new"
        icon="lock-closed-outline"
        error={errors.password}
      />
      <PasswordStrengthMeter password={security.password} />
      <ClayTextInput
        label="Confirma tu contraseña"
        value={security.confirmPassword}
        onChangeText={(value) => wizard.setSecurity('confirmPassword', value)}
        placeholder="Repítela para confirmar"
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password-new"
        icon="lock-closed-outline"
        error={errors.confirmPassword}
      />

      <ClayCheckbox
        checked={security.acceptedTerms}
        onToggle={wizard.toggleTerms}
        label="Acepto los Términos y Condiciones y la Política de Tratamiento de Datos Personales (Ley 1581 de 2012)."
        error={errors.acceptedTerms}
      />
    </View>
  );
}
