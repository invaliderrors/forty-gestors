import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { personaTypeCardStyles as styles } from '@/styles/register/personaTypeCard.styles';
import { clayShadow, colors } from '@/theme';

type PersonaTypeCardProps = {
  title: string;
  description: string;
  requirementsHint: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

/** Card clay grande del selector de tipo de cuenta: al tocarla navega al registro. */
export function PersonaTypeCard({
  title,
  description,
  requirementsHint,
  icon,
  onPress,
}: PersonaTypeCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
    >
      {({ pressed }) => (
        <View style={[styles.shell, !pressed && clayShadow.raised]}>
          <View style={[styles.face, pressed && styles.facePressed]}>
            <View style={styles.iconBubble}>
              <Ionicons name={icon} size={26} color={colors.textOnGold} />
            </View>
            <View style={styles.body}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
              <Text style={styles.requirements}>{requirementsHint}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={colors.textMuted} />
          </View>
        </View>
      )}
    </Pressable>
  );
}
