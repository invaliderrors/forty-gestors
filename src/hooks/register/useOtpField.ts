import { useEffect, useRef, useState } from 'react';

type UseOtpFieldParams = {
  length: number;
  cooldownSeconds: number;
  onVerify: (code: string) => void;
  onResend: () => Promise<void>;
};

/**
 * Estado del campo OTP: código escrito, cooldown de reenvío, aviso de
 * reenvío y auto-verificación al completar todas las cifras.
 */
export function useOtpField({ length, cooldownSeconds, onVerify, onResend }: UseOtpFieldParams) {
  const [code, setCode] = useState('');
  const [cooldown, setCooldown] = useState(cooldownSeconds);
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
    if (next.length === length && lastAutoSubmittedRef.current !== next) {
      lastAutoSubmittedRef.current = next;
      onVerify(next);
    }
  };

  const handleResend = async () => {
    setCooldown(cooldownSeconds);
    setCode('');
    lastAutoSubmittedRef.current = null;
    setResendNotice(true);
    await onResend();
  };

  return { code, cooldown, resendNotice, handleChange, handleResend };
}
