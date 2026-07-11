import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { ClayOtpInput } from '@/components/shared/clay/ClayOtpInput';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

const CODE_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 30;

type OtpVerificationProps = {
  email: string;
  checking: boolean;
  errorMessage: string | null;
  onVerify: (code: string) => void;
  onResend: () => Promise<void>;
};

/** Vista de verificación del código enviado al correo tras el registro. */
export function OtpVerification({
  email,
  checking,
  errorMessage,
  onVerify,
  onResend,
}: OtpVerificationProps) {
  const [code, setCode] = useState('');
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [resendNotice, setResendNotice] = useState(false);
  const lastAutoSubmittedRef = useRef<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCooldown((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (next: string) => {
    setCode(next);
    setResendNotice(false);
    // Auto-verifica al completar las 6 cifras (una sola vez por código).
    if (next.length === CODE_LENGTH && lastAutoSubmittedRef.current !== next) {
      lastAutoSubmittedRef.current = next;
      onVerify(next);
    }
  };

  const handleResend = async () => {
    setCooldown(RESEND_COOLDOWN_SECONDS);
    setCode('');
    lastAutoSubmittedRef.current = null;
    setResendNotice(true);
    await onResend();
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconBubble}>
        <Ionicons name="mail-unread-outline" size={30} color={colors.textOnGold} />
      </View>
      <Text style={styles.emailHint}>
        Escribe el código de 6 dígitos que enviamos a{'\n'}
        <Text style={styles.email}>{email}</Text>
      </Text>

      {errorMessage ? <ClayNotice tone="error" message={errorMessage} /> : null}
      {resendNotice ? <ClayNotice tone="info" message="Te reenviamos el código al correo." /> : null}

      <ClayOtpInput
        value={code}
        onChange={handleChange}
        length={CODE_LENGTH}
        disabled={checking}
        hasError={errorMessage !== null}
      />

      <ClayButton
        label="Verificar código"
        onPress={() => onVerify(code)}
        loading={checking}
        disabled={code.length < CODE_LENGTH}
      />
      <ClayButton
        label={cooldown > 0 ? `Reenviar código (${cooldown}s)` : 'Reenviar código'}
        variant="ghost"
        disabled={cooldown > 0}
        onPress={() => void handleResend()}
      />

      <Text style={styles.demoHint}>Código demo: 123456</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  iconBubble: {
    alignSelf: 'center',
    width: 72,
    height: 72,
    borderRadius: radii.lg,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 4,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailHint: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.body,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  email: {
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },
  demoHint: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    color: colors.textMuted,
  },
});
