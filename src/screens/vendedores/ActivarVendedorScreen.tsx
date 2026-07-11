import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { useActivateSeller } from '@/application/vendedores/useActivateSeller';
import { AuthShell } from '@/components/shared/AuthShell';
import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayTextInput } from '@/components/shared/clay/ClayTextInput';
import { PasswordStrengthMeter } from '@/components/shared/PasswordStrengthMeter';
import { activarVendedorStyles as styles } from '@/styles/vendedores/activarVendedor.styles';
import { colors } from '@/theme';

/**
 * Activación de la cuenta del vendedor con el código que le compartió su
 * gestor: código → contraseña → cuenta activa.
 */
export function ActivarVendedorScreen() {
  const router = useRouter();
  const form = useActivateSeller();

  if (form.state.phase === 'done') {
    return (
      <AuthShell centerContent>
        <View style={styles.successContainer}>
          <View style={styles.successBadge}>
            <Ionicons name="checkmark" size={44} color={colors.textOnGold} />
          </View>
          <Text style={styles.successTitle}>
            ¡Listo, {form.state.displayName.split(' ')[0]}!
          </Text>
          <Text style={styles.successMessage}>
            Tu cuenta de vendedor quedó activa. Ya puedes iniciar sesión con tu correo y tu
            contraseña.
          </Text>
          <Text style={styles.successNote}>
            El panel del vendedor (registro de ventas en campo) llega en una próxima iteración.
          </Text>
          <ClayButton label="Ir a iniciar sesión" onPress={() => router.back()} />
        </View>
      </AuthShell>
    );
  }

  const isPasswordPhase = form.state.phase === 'password';

  return (
    <AuthShell
      title="Activa tu cuenta"
      subtitle="Eres parte de un equipo de ventas: usa el código que te compartió tu gestor."
      onBack={() => router.back()}
      centerContent
    >
      <View style={styles.container}>
        <ClayTextInput
          label="Código de invitación"
          value={form.code}
          onChangeText={form.setCode}
          placeholder="Ej: K7M2XQ"
          autoCapitalize="characters"
          maxLength={6}
          icon="key-outline"
          error={form.errors.code}
          helper={isPasswordPhase ? undefined : 'Son 6 letras y números.'}
        />

        {isPasswordPhase && form.state.phase === 'password' ? (
          <>
            <View style={styles.sellerFound}>
              <Ionicons name="checkmark-circle" size={22} color={colors.successDeep} />
              <View style={styles.sellerFoundBody}>
                <Text style={styles.sellerFoundName}>{form.state.seller.fullName}</Text>
                <Text style={styles.sellerFoundHint}>
                  Invitación válida. Crea tu contraseña para terminar.
                </Text>
              </View>
            </View>
            <ClayTextInput
              label="Contraseña"
              value={form.password}
              onChangeText={form.setPassword}
              placeholder="Mínimo 8 caracteres"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
              icon="lock-closed-outline"
              error={form.errors.password}
            />
            <PasswordStrengthMeter password={form.password} />
            <ClayTextInput
              label="Confirma tu contraseña"
              value={form.confirmPassword}
              onChangeText={form.setConfirmPassword}
              placeholder="Repítela para confirmar"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
              icon="lock-closed-outline"
              error={form.errors.confirmPassword}
            />
            <ClayButton
              label="Activar mi cuenta"
              onPress={() => void form.activate()}
              loading={form.isBusy}
            />
          </>
        ) : (
          <ClayButton
            label="Validar código"
            onPress={() => void form.lookupCode()}
            loading={form.isBusy}
          />
        )}
      </View>
    </AuthShell>
  );
}
