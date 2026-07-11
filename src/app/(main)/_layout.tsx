import { Tabs } from 'expo-router';

import { ClayTabBar } from '@/components/main/ClayTabBar';
import { colors } from '@/theme';

export default function MainTabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <ClayTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="rifas" options={{ title: 'Rifas' }} />
      <Tabs.Screen name="billetera" options={{ title: 'Billetera' }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
