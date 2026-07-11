import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { RegisterWizard } from '@/application/registration/useRegisterWizard';
import { ClayPickerSheet } from '@/components/shared/clay/ClayPickerSheet';
import { ClaySelectField } from '@/components/shared/clay/ClaySelectField';
import { ClayTextInput } from '@/components/shared/clay/ClayTextInput';
import { DEPARTMENTS } from '@/domain/shared/colombia';
import { colors, fonts, fontSizes, spacing } from '@/theme';

const departmentOptions = DEPARTMENTS.map((department) => ({
  value: department,
  label: department,
}));

type ContactStepProps = {
  wizard: RegisterWizard;
};

/** Paso 2: dirección de notificación y datos de contacto. */
export function ContactStep({ wizard }: ContactStepProps) {
  const { contact } = wizard.state;
  const errors = wizard.visibleErrors;
  const [isDepartmentSheetOpen, setIsDepartmentSheetOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>¿Dónde operas principalmente?</Text>
      <ClayTextInput
        label="Dirección de notificación"
        value={contact.address}
        onChangeText={(value) => wizard.setContact('address', value)}
        placeholder="Calle 10 # 5-23, barrio..."
        autoComplete="street-address"
        icon="location-outline"
        error={errors.address}
      />
      <ClaySelectField
        label="Departamento"
        value={contact.department}
        placeholder="Selecciona el departamento"
        icon="map-outline"
        onPress={() => setIsDepartmentSheetOpen(true)}
        error={errors.department}
      />
      <ClayTextInput
        label="Ciudad o municipio"
        value={contact.city}
        onChangeText={(value) => wizard.setContact('city', value)}
        placeholder="Ej: Ibagué"
        autoCapitalize="words"
        icon="navigate-outline"
        error={errors.city}
      />

      <Text style={styles.sectionLabel}>Contacto</Text>
      <ClayTextInput
        label="Celular"
        value={contact.phone}
        onChangeText={(value) => wizard.setContact('phone', value.replace(/[^\d]/g, ''))}
        placeholder="3001234567"
        keyboardType="phone-pad"
        maxLength={10}
        autoComplete="tel"
        icon="call-outline"
        error={errors.phone}
        helper="Te contactaremos por este número durante la verificación."
      />
      <ClayTextInput
        label="Correo electrónico"
        value={contact.email}
        onChangeText={(value) => wizard.setContact('email', value)}
        placeholder="tucorreo@ejemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        icon="mail-outline"
        error={errors.email}
        helper="Será tu usuario para entrar a Fortu Gestor."
      />

      <ClayPickerSheet
        visible={isDepartmentSheetOpen}
        title="Departamento"
        options={departmentOptions}
        selectedValue={contact.department}
        onSelect={(value) => wizard.setContact('department', value)}
        onClose={() => setIsDepartmentSheetOpen(false)}
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
