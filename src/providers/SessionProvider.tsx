import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

import type { Session } from '@/domain/auth/types';

type SessionContextValue = {
  session: Session | null;
  signIn: (session: Session) => void;
  signOut: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

/**
 * Sesión en memoria del gestor autenticado (nombre para el saludo, email).
 * Cuando exista backend real, aquí se suma la persistencia segura de
 * tokens (expo-secure-store) y la restauración en frío, como fortu-app.
 */
export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      signIn: setSession,
      signOut: () => setSession(null),
    }),
    [session],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error('useSession debe usarse dentro de <SessionProvider>.');
  }
  return value;
}
