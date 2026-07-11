/**
 * Errores de dominio con código string estable, siguiendo la convención
 * de libs/shared-errors de fortu-app ("AUTH/INVALID_CREDENTIALS", ...).
 * Cuando se integre el backend real, estos códigos deben coincidir con
 * los del contrato.
 */
export class AppError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = new.target.name;
    this.code = code;
  }
}

export class InvalidCredentialsError extends AppError {
  constructor() {
    super('AUTH/INVALID_CREDENTIALS', 'Correo o contraseña incorrectos.');
  }
}

export class EmailAlreadyTakenError extends AppError {
  constructor() {
    super('AUTH/EMAIL_ALREADY_TAKEN', 'Ya existe una cuenta con este correo.');
  }
}

export class InvalidOtpError extends AppError {
  constructor() {
    super('AUTH/OTP_INVALID', 'El código no es correcto. Revísalo e intenta de nuevo.');
  }
}

export class InvalidInvitationCodeError extends AppError {
  constructor() {
    super(
      'SELLER/INVITATION_INVALID',
      'El código no es válido o ya fue usado. Pídele a tu gestor que lo verifique.',
    );
  }
}
