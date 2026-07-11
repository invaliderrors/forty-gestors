import { EmailAlreadyTakenError, InvalidOtpError } from '@/domain/auth/errors';
import type { RegistrationRepository } from '@/domain/registration/RegistrationRepository';
import type { RegistrationDraft, RegistrationResult } from '@/domain/registration/types';
import { createMockId, DEMO_OTP_CODE, mockDb, simulateLatency } from '@/infrastructure/mock/mockDb';

/**
 * Implementación mock del registro con verificación por código:
 * `submit` deja la solicitud pendiente con el código demo (123456) y la
 * cuenta recién se activa (usuario disponible para login) al verificar.
 */
export class MockRegistrationRepository implements RegistrationRepository {
  async submit(draft: RegistrationDraft): Promise<RegistrationResult> {
    await simulateLatency(1200);

    const email = draft.contact.email.trim().toLowerCase();
    if (mockDb.users.has(email)) {
      throw new EmailAlreadyTakenError();
    }

    const registrationId = createMockId('reg');
    mockDb.pendingRegistrations.set(registrationId, {
      registrationId,
      draft,
      otpCode: DEMO_OTP_CODE,
      receivedAt: new Date().toISOString(),
    });

    return { registrationId, email, status: 'verification_sent' };
  }

  async verifyCode(registrationId: string, code: string): Promise<void> {
    await simulateLatency(700);

    const pending = mockDb.pendingRegistrations.get(registrationId);
    if (!pending || pending.otpCode !== code.trim()) {
      throw new InvalidOtpError();
    }

    const { draft } = pending;
    const email = draft.contact.email.trim().toLowerCase();
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
    mockDb.pendingRegistrations.delete(registrationId);
  }

  async resendCode(registrationId: string): Promise<void> {
    await simulateLatency(600);
    const pending = mockDb.pendingRegistrations.get(registrationId);
    if (pending) {
      pending.otpCode = DEMO_OTP_CODE;
    }
  }
}
