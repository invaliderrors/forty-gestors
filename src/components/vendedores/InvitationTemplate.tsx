import { Ionicons } from '@expo/vector-icons';
import type { RefObject } from 'react';
import { Text, View } from 'react-native';

import { FortuLogo } from '@/components/shared/FortuLogo';
import { LightBackground } from '@/components/shared/LightBackground';
import { invitationTemplateStyles as styles } from '@/styles/vendedores/invitationTemplate.styles';
import { colors } from '@/theme';

type InvitationTemplateProps = {
  viewRef: RefObject<View | null>;
  sellerName: string;
  gestorName: string;
  invitationCode: string;
};

/**
 * Template de la invitación que se comparte como imagen: se renderiza
 * fuera de pantalla y se captura con react-native-view-shot.
 */
export function InvitationTemplate({
  viewRef,
  sellerName,
  gestorName,
  invitationCode,
}: InvitationTemplateProps) {
  const sellerFirstName = sellerName.trim().split(' ')[0] || 'vendedor';
  const gestorFirstName = gestorName.trim().split(' ')[0] || 'Tu gestor';

  return (
    <View style={styles.offscreen} pointerEvents="none">
      <View ref={viewRef} collapsable={false} style={styles.card}>
        <LightBackground />
        <FortuLogo size={26} />
        <View style={styles.badge}>
          <Ionicons name="people" size={12} color={colors.textOnGold} />
          <Text style={styles.badgeLabel}>Invitación de vendedor</Text>
        </View>
        <Text style={styles.title}>¡{sellerFirstName}, únete a mi equipo!</Text>
        <Text style={styles.message}>
          {gestorFirstName} te invita a vender rifas legales con Fortu.
        </Text>
        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>Tu código de activación</Text>
          <Text style={styles.codeValue}>{invitationCode}</Text>
        </View>
        <Text style={styles.steps}>
          Descarga la app de vendedores de Fortu e ingresa este código para activar tu cuenta.
        </Text>
        <Text style={styles.slogan}>¡Jugar legal es apostarle a la salud!</Text>
      </View>
    </View>
  );
}
