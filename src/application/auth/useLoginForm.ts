import { useState } from 'react';

import { AppError } from '@/domain/auth/errors';
import type { Session } from '@/domain/auth/types';
import { isValidEmail } from '@/domain/registration/validators';
import { useServices } from '@/providers/ServicesProvider';

type LoginStatus = 'idle' | 'loading' | 'error';

type LoginFieldErrors = {
  email?: string;
  password?: string;
};

export function useLoginForm(onSuccess: (session: Session) => void) {
  const { auth } = useServices();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<LoginStatus>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});

  const validate = (): boolean => {
    const errors: LoginFieldErrors = {};
    if (!isValidEmail(email)) {
      errors.email = 'Escribe un correo válido.';
    }
    if (password.length === 0) {
      errors.password = 'Escribe tu contraseña.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = async () => {
    setSubmitError(null);
    if (!validate()) {
      return;
    }
    setStatus('loading');
    try {
      const session = await auth.login({ email, password });
      setStatus('idle');
      onSuccess(session);
    } catch (error) {
      setStatus('error');
      setSubmitError(
        error instanceof AppError ? error.message : 'Algo salió mal. Intenta de nuevo.',
      );
    }
  };

  return {
    email,
    password,
    setEmail: (value: string) => {
      setEmail(value);
      setFieldErrors((current) => ({ ...current, email: undefined }));
    },
    setPassword: (value: string) => {
      setPassword(value);
      setFieldErrors((current) => ({ ...current, password: undefined }));
    },
    fieldErrors,
    submitError,
    isLoading: status === 'loading',
    submit,
  };
}
