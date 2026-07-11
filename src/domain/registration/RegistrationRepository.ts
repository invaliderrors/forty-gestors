import type { RegistrationDraft, RegistrationResult } from '@/domain/registration/types';

/**
 * Puerto de registro del gestor. Hoy lo implementa
 * MockRegistrationRepository; la integración real enviará el draft
 * (datos + documentos multipart) a la API de onboarding.
 */
export type RegistrationRepository = {
  submit(draft: RegistrationDraft): Promise<RegistrationResult>;
};
