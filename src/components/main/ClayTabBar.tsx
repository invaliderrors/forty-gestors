import { Ionicons } from '@expo/vector-icons';
// expo-router 57 bundlea su propia copia de bottom-tabs; el tipo se importa
// de su build (type-only: se borra al compilar, Metro nunca lo resuelve).
import type { BottomTabBarProps } from 'expo-router/build/layouts/Tabs';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { clayTabBarStyles as styles } from '@/styles/main/clayTabBar.styles';
import { clayShadow, colors } from '@/theme';

const TAB_CONFIG: Record<string, { icon: keyof typeof Ionicons.glyphMap; label: string }> = {
  home: { icon: 'home', label: 'Inicio' },
  rifas: { icon: 'ticket', label: 'Rifas' },
  billetera: { icon: 'wallet', label: 'Billetera' },
  perfil: { icon: 'person', label: 'Perfil' },
};

/**
 * Barra de navegación flotante (misma idea que la CustomGlassTabBar de
 * fortu-app, traducida a clay: superficie blanca con labio de
 * profundidad, tab activa en píldora dorada).
 */
export function ClayTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { bottom: insets.bottom + 12 }]} pointerEvents="box-none">
      <View style={[styles.bar, clayShadow.floating]}>
        {state.routes.map((route, index) => {
          const isActive = index === state.index;
          const config = TAB_CONFIG[route.name] ?? { icon: 'ellipse', label: route.name };

          const handlePress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isActive && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityLabel={config.label}
              accessibilityState={{ selected: isActive }}
              onPress={handlePress}
              style={({ pressed }) => [
                styles.tab,
                isActive && styles.tabActive,
                pressed && styles.tabPressed,
              ]}
            >
              <Ionicons
                name={isActive ? config.icon : (`${config.icon}-outline` as keyof typeof Ionicons.glyphMap)}
                size={21}
                color={isActive ? colors.ctaDepth : colors.textMuted}
              />
              <Text style={[styles.label, isActive && styles.labelActive]}>{config.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
