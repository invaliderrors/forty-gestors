import type { AuthRepository } from '@/domain/auth/AuthRepository';
import { InvalidCredentialsError } from '@/domain/auth/errors';
import type { LoginInput, Session } from '@/domain/auth/types';
import { mockDb, simulateLatency } from '@/infrastructure/mock/mockDb';

/**
 * Implementación mock del puerto de auth. Acepta la cuenta demo
 * (gestor@fortu.app / Fortu123!) y cualquier cuenta creada en el
 * registro durante la sesión. Reemplazar por HttpAuthRepository
 * cuando exista la API.
 */
export class MockAuthRepository implements AuthRepository {
  async login(input: LoginInput): Promise<Session> {
    await simulateLatency();
    const user = mockDb.users.get(input.email.trim().toLowerCase());
    if (!user || user.password !== input.password) {
      throw new InvalidCredentialsError();
    }
    return {
      userId: user.userId,
      email: user.email,
      displayName: user.displayName,
    };
  }
}
