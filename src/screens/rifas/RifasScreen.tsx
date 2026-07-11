import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { useRifasList } from '@/application/rifa/useRifasList';
import { RifaCard } from '@/components/rifas/RifaCard';
import { AuthShell } from '@/components/shared/AuthShell';
import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { LoadingDots } from '@/components/shared/LoadingDots';
import { rifasScreenStyles as styles } from '@/styles/rifas/rifasScreen.styles';
import { colors } from '@/theme';

const TAB_BAR_SPACE = 84;

/** Listado de rifas del gestor + acceso al wizard de creación. */
export function RifasScreen() {
  const router = useRouter();
  const list = useRifasList();

  return (
    <AuthShell
      title="Mis rifas"
      subtitle="Tus sorteos, boletas y vendedores."
      extraBottomPadding={TAB_BAR_SPACE}
    >
      <ClayButton label="Crear rifa" onPress={() => router.push('/crear-rifa')} />

      {list.status === 'loading' ? (
        <View style={styles.loading}>
          <LoadingDots color={colors.textMuted} />
        </View>
      ) : null}

      {list.status === 'error' ? (
        <ClayNotice tone="error" message="No pudimos cargar tus rifas. Vuelve a intentarlo." />
      ) : null}

      {list.status === 'ready' && list.rifas.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyBubble}>
            <Ionicons name="ticket-outline" size={32} color={colors.ctaDepth} />
          </View>
          <Text style={styles.emptyTitle}>Aún no tienes rifas</Text>
          <Text style={styles.emptyMessage}>
            Crea tu primera rifa: configura la emisión, define el premio y déjala lista para la
            autorización de Coljuegos.
          </Text>
        </View>
      ) : null}

      {list.status === 'ready' && list.rifas.length > 0 ? (
        <View style={styles.list}>
          {list.rifas.map((rifa) => (
            <RifaCard key={rifa.id} rifa={rifa} />
          ))}
        </View>
      ) : null}
    </AuthShell>
  );
}
