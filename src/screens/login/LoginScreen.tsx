import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useLoginForm } from '@/application/auth/useLoginForm';
import { AuthShell } from '@/components/shared/AuthShell';
import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayCard } from '@/components/shared/clay/ClayCard';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { ClayTextInput } from '@/components/shared/clay/ClayTextInput';
import { FortuLogo } from '@/components/shared/FortuLogo';
import { colors, fonts, fontSizes, spacing } from '@/theme';

export function LoginScreen() {
  const router = useRouter();
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const form = useLoginForm(() => {
    router.replace('/home');
  });

  return (
    <AuthShell
      title="Hola otra vez"
      subtitle="Entra para administrar tus rifas, tus vendedores y tu recaudo."
      heroAccessory={
        <View style={styles.logoRow}>
          <FortuLogo size={34} withGestorTag />
        </View>
      }
    >
      <ClayCard style={styles.card}>
        {form.submitError ? <ClayNotice tone="error" message={form.submitError} /> : null}
        {infoMessage ? <ClayNotice tone="info" message={infoMessage} /> : null}

        <ClayTextInput
          label="Correo electrónico"
          value={form.email}
          onChangeText={form.setEmail}
          placeholder="tucorreo@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          icon="mail-outline"
          error={form.fieldErrors.email}
        />
        <ClayTextInput
          label="Contraseña"
          value={form.password}
          onChangeText={form.setPassword}
          placeholder="Tu contraseña"
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
          icon="lock-closed-outline"
          error={form.fieldErrors.password}
        />

        <ClayButton
          label="Entrar"
          onPress={form.submit}
          loading={form.isLoading}
          variant="primary"
        />
        <ClayButton
          label="¿Olvidaste tu contraseña?"
          variant="ghost"
          onPress={() =>
            setInfoMessage('La recuperación de contraseña llega en la próxima iteración.')
          }
        />
      </ClayCard>

      <View style={styles.registerBlock}>
        <Text style={styles.registerHint}>¿Aún no tienes cuenta de gestor?</Text>
        <ClayButton
          label="Crear cuenta"
          variant="secondary"
          onPress={() => router.push('/register')}
        />
      </View>

      <Text style={styles.demoHint}>Cuenta demo: gestor@fortu.app · Fortu123!</Text>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  logoRow: {
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  card: {
    gap: spacing.lg,
  },
  registerBlock: {
    gap: spacing.md,
  },
  registerHint: {
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    color: colors.textSecondary,
  },
  demoHint: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    color: colors.textMuted,
  },
});
