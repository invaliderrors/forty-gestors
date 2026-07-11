import { EmailAlreadyTakenError } from '@/domain/auth/errors';
import type { RegistrationRepository } from '@/domain/registration/RegistrationRepository';
import type { RegistrationDraft, RegistrationResult } from '@/domain/registration/types';
import { createMockId, mockDb, simulateLatency } from '@/infrastructure/mock/mockDb';

/**
 * Implementación mock del registro: guarda el draft en memoria y da de
 * alta el usuario para que el login funcione de inmediato. La versión
 * real enviará los datos + documentos a la API de onboarding y el
 * estado quedará en revisión KYC.
 */
export class MockRegistrationRepository implements RegistrationRepository {
  async submit(draft: RegistrationDraft): Promise<RegistrationResult> {
    await simulateLatency(1200);

    const email = draft.contact.email.trim().toLowerCase();
    if (mockDb.users.has(email)) {
      throw new EmailAlreadyTakenError();
    }

    const displayName =
      draft.identity.personaType === 'natural'
        ? draft.identity.fullName.trim()
        : draft.identity.razonSocial.trim();

    mockDb.users.set(email, {
      userId: createMockId('usr'),
      email,
      password: draft.password,
      displayName,
    });

    const registrationId = createMockId('reg');
    mockDb.registrations.push({
      registrationId,
      draft,
      receivedAt: new Date().toISOString(),
    });

    return { registrationId, status: 'pending_review' };
  }
}
