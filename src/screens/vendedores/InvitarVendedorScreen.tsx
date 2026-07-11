import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { useInviteSeller } from '@/application/vendedores/useInviteSeller';
import { AuthShell } from '@/components/shared/AuthShell';
import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayCheckbox } from '@/components/shared/clay/ClayCheckbox';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { ClayTextInput } from '@/components/shared/clay/ClayTextInput';
import { SELLER_PERMISSIONS } from '@/domain/vendedores/types';
import { invitarVendedorStyles as styles } from '@/styles/vendedores/invitarVendedor.styles';
import { colors } from '@/theme';

/** Invitación de un vendedor: datos, permisos específicos y comisión. */
export function InvitarVendedorScreen() {
  const router = useRouter();
  const form = useInviteSeller();

  if (form.submit.status === 'success') {
    const { seller } = form.submit;
    return (
      <AuthShell centerContent>
        <View style={styles.successContainer}>
          <View style={styles.successBadge}>
            <Ionicons name="paper-plane" size={40} color={colors.textOnGold} />
          </View>
          <Text style={styles.successTitle}>¡Invitación creada!</Text>
          <Text style={styles.successMessage}>
            Comparte este código con {seller.fullName.split(' ')[0]} para que active su cuenta de
            vendedor.
          </Text>
          <View style={styles.codeCard}>
            <Text style={styles.codeLabel}>Código de invitación</Text>
            <Text style={styles.codeValue}>{seller.invitationCode}</Text>
          </View>
          <ClayButton label="Volver a vendedores" onPress={() => router.back()} />
        </View>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Invitar vendedor"
      subtitle="Crea el usuario de tu empleado y asígnale permisos específicos."
      onBack={() => router.back()}
    >
      {form.submit.status === 'error' ? (
        <ClayNotice tone="error" message={form.submit.message} />
      ) : null}

      <ClayTextInput
        label="Nombre completo"
        value={form.fullName}
        onChangeText={form.setFullName}
        placeholder="Nombre del vendedor"
        autoCapitalize="words"
        autoComplete="name"
        icon="person-outline"
        error={form.visibleErrors.fullName}
      />
      <ClayTextInput
        label="Cédula"
        value={form.docNumber}
        onChangeText={form.setDocNumber}
        placeholder="Ej: 1023456789"
        keyboardType="number-pad"
        icon="id-card-outline"
        error={form.visibleErrors.docNumber}
      />
      <ClayTextInput
        label="Celular"
        value={form.phone}
        onChangeText={form.setPhone}
        placeholder="3001234567"
        keyboardType="phone-pad"
        maxLength={10}
        autoComplete="tel"
        icon="call-outline"
        error={form.visibleErrors.phone}
      />
      <ClayTextInput
        label="Correo electrónico"
        value={form.email}
        onChangeText={form.setEmail}
        placeholder="vendedor@ejemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        icon="mail-outline"
        error={form.visibleErrors.email}
        helper="Será su usuario para entrar a su app de vendedor."
      />

      <Text style={styles.sectionLabel}>Permisos específicos</Text>
      <View style={styles.permissionBox}>
        {SELLER_PERMISSIONS.map((permission) => (
          <ClayCheckbox
            key={permission.value}
            checked={form.permissions.includes(permission.value)}
            onToggle={() => form.togglePermission(permission.value)}
            label={`${permission.label} — ${permission.hint}`}
          />
        ))}
      </View>
      {form.visibleErrors.permissions ? (
        <Text style={styles.permissionError}>{form.visibleErrors.permissions}</Text>
      ) : null}

      <ClayTextInput
        label="Comisión por venta (opcional)"
        value={form.commissionRaw}
        onChangeText={form.setCommission}
        placeholder="Ej: 10"
        keyboardType="number-pad"
        maxLength={2}
        icon="cash-outline"
        error={form.visibleErrors.commission}
        helper="Porcentaje sobre cada boleta que venda."
      />

      <ClayButton
        label="Enviar invitación"
        onPress={() => void form.send()}
        loading={form.submit.status === 'submitting'}
      />
    </AuthShell>
  );
}
