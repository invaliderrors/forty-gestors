import type { Rifa } from '@/domain/rifa/types';
import type { RegistrationDraft } from '@/domain/registration/types';

type MockUser = {
  userId: string;
  email: string;
  password: string;
  displayName: string;
};

type PendingRegistration = {
  registrationId: string;
  draft: RegistrationDraft;
  otpCode: string;
  receivedAt: string;
};

/** Código OTP fijo del entorno mock (el backend real lo enviará por correo). */
export const DEMO_OTP_CODE = '123456';

/**
 * Base de datos en memoria compartida por los mocks: lo que se registra
 * queda disponible para el login dentro de la misma sesión de app.
 * Desaparece al reiniciar — es solo para trabajar la UI sin backend.
 */
export const mockDb = {
  users: new Map<string, MockUser>([
    [
      'gestor@fortu.app',
      {
        userId: 'usr_demo_gestor',
        email: 'gestor@fortu.app',
        password: 'Fortu123!',
        displayName: 'Gestor Demo',
      },
    ],
  ]),
  pendingRegistrations: new Map<string, PendingRegistration>(),
  registrationCounter: 0,
  rifas: [] as Rifa[],
  rifaCounter: 0,
};

/** Número institucional de la rifa: RF-AAAAMM-consecutivo (ej: RF-202607-001). */
export function createRifaNumber(): string {
  mockDb.rifaCounter += 1;
  const now = new Date();
  const period = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
  return `RF-${period}-${String(mockDb.rifaCounter).padStart(3, '0')}`;
}

/**
 * Número de solicitud en formato institucional: AAAAMM + consecutivo.
 * Ej: 202607-0001. El backend real asignará el consecutivo oficial.
 */
export function createRegistrationNumber(): string {
  mockDb.registrationCounter += 1;
  const now = new Date();
  const period = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
  return `${period}-${String(mockDb.registrationCounter).padStart(4, '0')}`;
}

export function createMockId(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}${random}`;
}

export function simulateLatency(ms = 750): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
