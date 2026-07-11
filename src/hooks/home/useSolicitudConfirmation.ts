import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

/**
 * Lee el parámetro `solicitud` de la ruta y controla la confirmación del
 * modal de solicitud registrada: visible hasta que el gestor confirma.
 */
export function useSolicitudConfirmation() {
  const { solicitud } = useLocalSearchParams<{ solicitud?: string }>();
  const [isSolicitudConfirmed, setIsSolicitudConfirmed] = useState(false);

  const solicitudId = typeof solicitud === 'string' && solicitud.length > 0 ? solicitud : null;

  return {
    solicitudId,
    isVisible: solicitudId !== null && !isSolicitudConfirmed,
    confirm: () => setIsSolicitudConfirmed(true),
  };
}
