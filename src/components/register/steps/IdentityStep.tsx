import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { RegisterWizard } from '@/application/registration/useRegisterWizard';
import { ClayPickerSheet } from '@/components/shared/clay/ClayPickerSheet';
import { ClaySelectField } from '@/components/shared/clay/ClaySelectField';
import { ClayTextInput } from '@/components/shared/clay/ClayTextInput';
import type { NaturalDocType } from '@/domain/registration/types';
import { NATURAL_DOC_TYPES, naturalDocTypeLabel } from '@/domain/registration/types';
import { computeNitCheckDigit, isAlphanumericDoc } from '@/domain/registration/validators';
import { colors, fonts, fontSizes, spacing } from '@/theme';

const docTypeOptions = NATURAL_DOC_TYPES.map((option) => ({
  value: option.value,
  label: option.label,
}));

type IdentityStepProps = {
  wizard: RegisterWizard;
};

/** Paso 1: identificación (KYC básico). El tipo de persona ya viene elegido. */
export function IdentityStep({ wizard }: IdentityStepProps) {
  const { identity } = wizard.state;
  const errors = wizard.visibleErrors;
  const [isDocTypeSheetOpen, setIsDocTypeSheetOpen] = useState(false);

  if (identity.personaType === 'natural') {
    const allowsLetters = isAlphanumericDoc(identity.docType);

    return (
      <View style={styles.container}>
        <Text style={styles.sectionLabel}>Tus datos</Text>
        <ClaySelectField
          label="Tipo de documento"
          value={naturalDocTypeLabel(identity.docType)}
          placeholder="Selecciona el tipo de documento"
          icon="documents-outline"
          onPress={() => setIsDocTypeSheetOpen(true)}
        />
        <ClayTextInput
          label="Número de documento"
          value={identity.docNumber}
          onChangeText={(value) =>
            wizard.setIdentity(
              'docNumber',
              allowsLetters ? value.replace(/[^A-Za-z0-9]/g, '') : value.replace(/[^\d]/g, ''),
            )
          }
          placeholder={allowsLetters ? 'Ej: AB123456' : 'Ej: 1023456789'}
          keyboardType={allowsLetters ? 'default' : 'number-pad'}
          autoCapitalize={allowsLetters ? 'characters' : 'none'}
          maxLength={allowsLetters ? 20 : 15}
          icon="id-card-outline"
          error={errors.docNumber}
        />
        <ClayTextInput
          label="Nombre completo"
          value={identity.fullName}
          onChangeText={(value) => wizard.setIdentity('fullName', value)}
          placeholder="Como aparece en tu documento"
          autoCapitalize="words"
          autoComplete="name"
          icon="person-outline"
          error={errors.fullName}
        />

        <ClayPickerSheet
          visible={isDocTypeSheetOpen}
          title="Tipo de documento"
          options={docTypeOptions}
          selectedValue={identity.docType}
          onSelect={(value: NaturalDocType) => {
            wizard.setIdentity('docType', value);
            // El formato cambia entre numérico y alfanumérico: limpiamos para no
            // dejar un número inválido para el nuevo tipo.
            wizard.setIdentity('docNumber', '');
          }}
          onClose={() => setIsDocTypeSheetOpen(false)}
        />
      </View>
    );
  }

  const nitBase = identity.nit.split('-')[0];
  const suggestedDv =
    !identity.nit.includes('-') && nitBase.length >= 9 ? computeNitCheckDigit(nitBase) : null;

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
        helper={suggestedDv !== null ? `Dígito de verificación sugerido: ${suggestedDv}` : undefined}
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
        maxLength={15}
        icon="id-card-outline"
        error={errors.repLegalDocNumber}
      />
    </View>
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
});
