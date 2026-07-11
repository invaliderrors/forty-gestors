import type { LoginInput, Session } from '@/domain/auth/types';

/**
 * Puerto de autenticación. Hoy lo implementa MockAuthRepository;
 * la integración real será un HttpAuthRepository contra la API de Fortu.
 */
export type AuthRepository = {
  login(input: LoginInput): Promise<Session>;
};
