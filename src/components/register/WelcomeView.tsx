import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { ClayButton } from '@/components/shared/clay/ClayButton';
import { useWelcomeIntro } from '@/hooks/register/useWelcomeIntro';
import { welcomeViewStyles as styles } from '@/styles/register/welcomeView.styles';
import { colors } from '@/theme';

type WelcomeViewProps = {
  displayName: string;
  onContinue: () => void;
};

/** Bienvenida tras verificar el correo: cuenta activa, rumbo al panel. */
export function WelcomeView({ displayName, onContinue }: WelcomeViewProps) {
  const { badgeStyle, textStyle } = useWelcomeIntro();

  const firstName = displayName.trim().split(' ')[0] || 'gestor';

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.badge, badgeStyle]}>
        <Ionicons name="ribbon" size={46} color={colors.textOnGold} />
      </Animated.View>
      <Animated.View style={[styles.textBlock, textStyle]}>
        <Text style={styles.title}>¡Todo listo, {firstName}!</Text>
        <Text style={styles.message}>Tu correo quedó verificado. Bienvenido a Fortu Gestor.</Text>
        <Text style={styles.note}>Tus documentos suministrados seguirán bajo revisión.</Text>
      </Animated.View>
      <ClayButton label="Ir a mi panel" onPress={onContinue} />
    </View>
  );
}
