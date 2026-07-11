import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { ClayOtpInput } from '@/components/shared/clay/ClayOtpInput';
import { useOtpField } from '@/hooks/register/useOtpField';
import { otpVerificationStyles as styles } from '@/styles/register/otpVerification.styles';
import { colors } from '@/theme';

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
  const { code, cooldown, resendNotice, handleChange, handleResend } = useOtpField({
    length: CODE_LENGTH,
    cooldownSeconds: RESEND_COOLDOWN_SECONDS,
    onVerify,
    onResend,
  });

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
