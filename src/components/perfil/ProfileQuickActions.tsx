import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { profileQuickActionsStyles as styles } from '@/styles/perfil/profileQuickActions.styles';
import { clayShadow, colors } from '@/theme';

type QuickAction = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

type ProfileQuickActionsProps = {
  actions: readonly QuickAction[];
};

/** Accesos rápidos bajo el hero (equivalente clay del ProfileQuickActions de fortu-app). */
export function ProfileQuickActions({ actions }: ProfileQuickActionsProps) {
  return (
    <View style={styles.row}>
      {actions.map((action) => (
        <Pressable
          key={action.label}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          onPress={action.onPress}
        >
          {({ pressed }) => (
            <View style={[styles.shell, !pressed && clayShadow.subtle]}>
              <View style={[styles.face, pressed && styles.facePressed]}>
                <View style={styles.iconBubble}>
                  <Ionicons name={action.icon} size={19} color={colors.textOnGold} />
                </View>
                <Text style={styles.label}>{action.label}</Text>
              </View>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
}
