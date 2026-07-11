import { createContext, useContext, useMemo, type PropsWithChildren } from 'react';

import type { AuthRepository } from '@/domain/auth/AuthRepository';
import type { DocumentScanner } from '@/domain/documents/DocumentScanner';
import type { MediaPicker } from '@/domain/media/MediaPicker';
import type { RegistrationRepository } from '@/domain/registration/RegistrationRepository';
import type { RifaRepository } from '@/domain/rifa/RifaRepository';
import { MockAuthRepository } from '@/infrastructure/auth/MockAuthRepository';
import { MlKitDocumentScanner } from '@/infrastructure/documents/MlKitDocumentScanner';
import { ExpoMediaPicker } from '@/infrastructure/media/ExpoMediaPicker';
import { MockRegistrationRepository } from '@/infrastructure/registration/MockRegistrationRepository';
import { MockRifaRepository } from '@/infrastructure/rifa/MockRifaRepository';

export type Services = {
  auth: AuthRepository;
  registration: RegistrationRepository;
  mediaPicker: MediaPicker;
  documentScanner: DocumentScanner;
  rifas: RifaRepository;
};

const ServicesContext = createContext<Services | null>(null);

/**
 * Composition root: único lugar donde se instancian implementaciones
 * concretas. Integrar el backend = reemplazar los Mock* por Http* aquí,
 * sin tocar pantallas ni hooks (mismo patrón que AppProviders en fortu-app).
 */
export function ServicesProvider({ children }: PropsWithChildren) {
  const services = useMemo<Services>(
    () => ({
      auth: new MockAuthRepository(),
      registration: new MockRegistrationRepository(),
      mediaPicker: new ExpoMediaPicker(),
      documentScanner: new MlKitDocumentScanner(),
      rifas: new MockRifaRepository(),
    }),
    [],
  );

  return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>;
}

export function useServices(): Services {
  const services = useContext(ServicesContext);
  if (!services) {
    throw new Error('useServices debe usarse dentro de <ServicesProvider>.');
  }
  return services;
}
