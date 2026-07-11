import { StyleSheet, Text, View } from 'react-native';

import type { RegisterWizard } from '@/application/registration/useRegisterWizard';
import { ClayTextInput } from '@/components/shared/clay/ClayTextInput';
import { computeNitCheckDigit } from '@/domain/registration/validators';
import { colors, fonts, fontSizes, spacing } from '@/theme';

type IdentityStepProps = {
  wizard: RegisterWizard;
};

/** Paso 1: identificación (KYC básico del Decreto 1486). El tipo de persona ya viene elegido. */
export function IdentityStep({ wizard }: IdentityStepProps) {
  const { identity } = wizard.state;
  const errors = wizard.visibleErrors;
  const isNatural = identity.personaType === 'natural';

  const nitBase = identity.nit.split('-')[0];
  const suggestedDv = !identity.nit.includes('-') && nitBase.length >= 9
    ? computeNitCheckDigit(nitBase)
    : null;

  if (isNatural) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionLabel}>Tus datos</Text>
        <View style={styles.docTypeRow}>
          <DocTypeChoice
            label="Cédula (CC)"
            selected={identity.docType === 'CC'}
            onPress={() => wizard.setIdentity('docType', 'CC')}
          />
          <DocTypeChoice
            label="C. Extranjería"
            selected={identity.docType === 'CE'}
            onPress={() => wizard.setIdentity('docType', 'CE')}
          />
        </View>
        <ClayTextInput
          label="Número de documento"
          value={identity.docNumber}
          onChangeText={(value) => wizard.setIdentity('docNumber', value.replace(/[^\d]/g, ''))}
          placeholder="Ej: 1023456789"
          keyboardType="number-pad"
          maxLength={12}
          icon="id-card-outline"
          error={errors.docNumber}
        />
        <ClayTextInput
          label="Nombre completo"
          value={identity.fullName}
          onChangeText={(value) => wizard.setIdentity('fullName', value)}
          placeholder="Como aparece en tu cédula"
          autoCapitalize="words"
          autoComplete="name"
          icon="person-outline"
          error={errors.fullName}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>Datos de la empresa</Text>
      <ClayTextInput
        label="NIT"
        value={identity.nit}
        onChangeText={(value) => wizard.setIdentity('nit', value.replace(/[^\d-]/g, ''))}
        placeholder="Ej: 900123456-7"
        keyboardType="numbers-and-punctuation"
        maxLength={12}
        icon="business-outline"
        error={errors.nit}
        helper={
          suggestedDv !== null ? `Dígito de verificación sugerido: ${suggestedDv}` : undefined
        }
      />
      <ClayTextInput
        label="Razón social"
        value={identity.razonSocial}
        onChangeText={(value) => wizard.setIdentity('razonSocial', value)}
        placeholder="Nombre legal de la empresa"
        autoCapitalize="words"
        icon="briefcase-outline"
        error={errors.razonSocial}
      />
      <Text style={styles.sectionLabel}>Representante legal</Text>
      <ClayTextInput
        label="Nombre completo"
        value={identity.repLegalName}
        onChangeText={(value) => wizard.setIdentity('repLegalName', value)}
        placeholder="Nombre del representante"
        autoCapitalize="words"
        icon="person-outline"
        error={errors.repLegalName}
      />
      <ClayTextInput
        label="Cédula del representante"
        value={identity.repLegalDocNumber}
        onChangeText={(value) =>
          wizard.setIdentity('repLegalDocNumber', value.replace(/[^\d]/g, ''))
        }
        placeholder="Ej: 1023456789"
        keyboardType="number-pad"
        maxLength={12}
        icon="id-card-outline"
        error={errors.repLegalDocNumber}
      />
    </View>
  );
}

function DocTypeChoice({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Text
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={[styles.compactChoice, selected && styles.compactChoiceSelected]}
    >
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  sectionLabel: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  docTypeRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  compactChoice: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
    overflow: 'hidden',
  },
  compactChoiceSelected: {
    borderColor: colors.ctaFace,
    backgroundColor: colors.goldSoftBg,
    color: colors.textPrimary,
  },
});
