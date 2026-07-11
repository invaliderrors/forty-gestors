import { createContext, useContext, useMemo, type PropsWithChildren } from 'react';

import type { AuthRepository } from '@/domain/auth/AuthRepository';
import type { MediaPicker } from '@/domain/media/MediaPicker';
import type { RegistrationRepository } from '@/domain/registration/RegistrationRepository';
import { MockAuthRepository } from '@/infrastructure/auth/MockAuthRepository';
import { ExpoMediaPicker } from '@/infrastructure/media/ExpoMediaPicker';
import { MockRegistrationRepository } from '@/infrastructure/registration/MockRegistrationRepository';

export type Services = {
  auth: AuthRepository;
  registration: RegistrationRepository;
  mediaPicker: MediaPicker;
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
