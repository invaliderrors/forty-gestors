import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { profileMenuRowStyles as styles } from '@/styles/perfil/profileMenuRow.styles';
import { colors } from '@/theme';

type ProfileMenuRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sub: string;
  /** Dato corto a la derecha (ej: "0 rifas"). */
  meta?: string;
  onPress: () => void;
};

/** Fila de menú del perfil (equivalente clay del ProfileMenuRow de fortu-app). */
export function ProfileMenuRow({ icon, label, sub, meta, onPress }: ProfileMenuRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.iconBubble}>
        <Ionicons name={icon} size={19} color={colors.accentDeep} />
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.sub}>{sub}</Text>
      </View>
      {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}
