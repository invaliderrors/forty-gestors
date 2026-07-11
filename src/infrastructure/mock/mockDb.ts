import type { RegistrationDraft } from '@/domain/registration/types';

type MockUser = {
  userId: string;
  email: string;
  password: string;
  displayName: string;
};

type StoredRegistration = {
  registrationId: string;
  draft: RegistrationDraft;
  receivedAt: string;
};

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
  registrations: [] as StoredRegistration[],
};

export function createMockId(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}${random}`;
}

export function simulateLatency(ms = 750): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
