import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { profileMenuGroupStyles as styles } from '@/styles/perfil/profileMenuGroup.styles';
import { colors } from '@/theme';

export type ProfileMenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sub?: string;
  meta?: string;
  onPress: () => void;
};

type ProfileMenuGroupProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sub: string;
  items: readonly ProfileMenuItem[];
};

/**
 * Grupo desplegable del menú de perfil: una sola entrada de primer nivel
 * que al tocarla revela sus opciones (mantiene el perfil corto y ordenado).
 */
export function ProfileMenuGroup({ icon, label, sub, items }: ProfileMenuGroupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ expanded: isOpen }}
        onPress={() => setIsOpen((current) => !current)}
        style={({ pressed }) => [styles.header, pressed && styles.pressed]}
      >
        <View style={styles.headerIcon}>
          <Ionicons name={icon} size={19} color={colors.textOnGold} />
        </View>
        <View style={styles.headerBody}>
          <Text style={styles.headerLabel}>{label}</Text>
          <Text style={styles.headerSub}>{sub}</Text>
        </View>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.textMuted}
        />
      </Pressable>

      {isOpen
        ? items.map((item) => (
            <View key={item.label}>
              <View style={styles.divider} />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={item.label}
                onPress={item.onPress}
                style={({ pressed }) => [styles.item, pressed && styles.pressed]}
              >
                <View style={styles.itemIcon}>
                  <Ionicons name={item.icon} size={16} color={colors.accentDeep} />
                </View>
                <View style={styles.itemBody}>
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  {item.sub ? <Text style={styles.itemSub}>{item.sub}</Text> : null}
                </View>
                {item.meta ? <Text style={styles.itemMeta}>{item.meta}</Text> : null}
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </Pressable>
            </View>
          ))
        : null}
    </View>
  );
}
