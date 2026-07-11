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
