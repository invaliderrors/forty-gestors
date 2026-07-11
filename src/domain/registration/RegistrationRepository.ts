import type { Session } from '@/domain/auth/types';
import type { RegistrationDraft, RegistrationResult } from '@/domain/registration/types';

/**
 * Puerto de registro del gestor. Flujo: `submit` envía la solicitud y
 * dispara un código OTP al correo; `verifyCode` lo valida y activa la
 * cuenta; `resendCode` reenvía el código.
 *
 * Hoy lo implementa MockRegistrationRepository (código demo fijo); la
 * integración real enviará el draft multipart y el OTP por email.
 */
export type RegistrationRepository = {
  submit(draft: RegistrationDraft): Promise<RegistrationResult>;
  /** Activa la cuenta y devuelve la sesión. Lanza InvalidOtpError si el código no coincide. */
  verifyCode(registrationId: string, code: string): Promise<Session>;
  resendCode(registrationId: string): Promise<void>;
};
