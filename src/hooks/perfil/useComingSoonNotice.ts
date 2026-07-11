import { useState } from 'react';

/**
 * Aviso de "próximamente" del perfil: guarda el mensaje informativo y
 * expone la fábrica `comingSoon(feature)` que lo publica al presionar.
 */
export function useComingSoonNotice() {
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const comingSoon = (feature: string) => () =>
    setInfoMessage(`${feature} llega en una próxima iteración.`);

  return { infoMessage, comingSoon };
}
