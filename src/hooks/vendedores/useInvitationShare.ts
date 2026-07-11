import * as Sharing from 'expo-sharing';
import { useRef, useState } from 'react';
import type { View } from 'react-native';
import { captureRef } from 'react-native-view-shot';

/**
 * Captura el template de invitación (renderizado fuera de pantalla) como
 * imagen PNG y abre el share sheet nativo.
 */
export function useInvitationShare() {
  const templateRef = useRef<View | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const share = async () => {
    if (isSharing) {
      return;
    }
    setIsSharing(true);
    setShareError(null);
    try {
      const uri = await captureRef(templateRef, { format: 'png', quality: 1 });
      if (!(await Sharing.isAvailableAsync())) {
        setShareError('Compartir no está disponible en este dispositivo.');
        return;
      }
      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: 'Compartir invitación',
      });
    } catch {
      setShareError('No pudimos generar la imagen de la invitación. Intenta de nuevo.');
    } finally {
      setIsSharing(false);
    }
  };

  return { templateRef, share, isSharing, shareError };
}
