import { useState } from 'react';

import { AppError } from '@/domain/auth/errors';
import { isValidPassword } from '@/domain/registration/validators';
import type { Seller } from '@/domain/vendedores/types';
import { useServices } from '@/providers/ServicesProvider';

type ActivatePhase =
  | { phase: 'code' }
  | { phase: 'password'; seller: Seller }
  | { phase: 'done'; displayName: string };

type ActivateErrors = Partial<Record<string, string>>;

/**
 * Activación de la cuenta del vendedor con su código de invitación:
 * validar código → crear contraseña → cuenta activa.
 */
export function useActivateSeller() {
  const { sellers } = useServices();
  const [state, setState] = useState<ActivatePhase>({ phase: 'code' });
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ActivateErrors>({});
  const [isBusy, setIsBusy] = useState(false);

  const lookupCode = async () => {
    if (code.trim().length < 6) {
      setErrors({ code: 'Escribe el código de 6 caracteres que te compartió tu gestor.' });
      return;
    }
    setIsBusy(true);
    setErrors({});
    try {
      const seller = await sellers.findByInvitationCode(code);
      if (!seller) {
        setErrors({ code: 'El código no es válido o ya fue usado. Verifícalo con tu gestor.' });
        return;
      }
      setState({ phase: 'password', seller });
    } catch {
      setErrors({ code: 'No pudimos validar el código. Intenta de nuevo.' });
    } finally {
      setIsBusy(false);
    }
  };

  const activate = async () => {
    const validation: ActivateErrors = {};
    if (!isValidPassword(password)) {
      validation.password = 'Mínimo 8 caracteres, con mayúscula, minúscula y número.';
    }
    if (confirmPassword !== password || confirmPassword.length === 0) {
      validation.confirmPassword = 'Las contraseñas no coinciden.';
    }
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setIsBusy(true);
    setErrors({});
    try {
      const session = await sellers.activate(code, password);
      setState({ phase: 'done', displayName: session.displayName });
    } catch (error) {
      setErrors({
        password:
          error instanceof AppError
            ? error.message
            : 'No pudimos activar tu cuenta. Intenta de nuevo.',
      });
    } finally {
      setIsBusy(false);
    }
  };

  return {
    state,
    code,
    setCode: (value: string) =>
      setCode(
        value
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, '')
          .slice(0, 6),
      ),
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    isBusy,
    lookupCode,
    activate,
  };
}
