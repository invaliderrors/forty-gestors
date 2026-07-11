import { Ionicons } from '@expo/vector-icons';
import { Modal, Text, View } from 'react-native';

import { ClayButton } from '@/components/shared/clay/ClayButton';
import { solicitudConfirmationModalStyles as styles } from '@/styles/home/solicitudConfirmationModal.styles';
import { colors } from '@/theme';

type SolicitudConfirmationModalProps = {
  visible: boolean;
  /** Número institucional de la solicitud (AAAAMM-consecutivo). */
  registrationId: string;
  onContinue: () => void;
};

/**
 * Confirmación de la solicitud registrada, mostrada al llegar por primera
 * vez al panel: número institucional + "Sí, continuar" para entrar.
 */
export function SolicitudConfirmationModal({
  visible,
  registrationId,
  onContinue,
}: SolicitudConfirmationModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onContinue}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.badge}>
            <Ionicons name="checkmark" size={40} color={colors.textOnGold} />
          </View>
          <Text style={styles.title}>¡Solicitud registrada!</Text>
          <View style={styles.refCard}>
            <Text style={styles.refLabel}>Número de solicitud</Text>
            <Text style={styles.refValue}>{registrationId}</Text>
          </View>
          <Text style={styles.message}>
            Guarda este número: con él haremos seguimiento a la revisión de tus documentos. Te
            avisaremos por correo cuando la verificación termine.
          </Text>
          <ClayButton label="Sí, continuar" onPress={onContinue} />
        </View>
      </View>
    </Modal>
  );
}
