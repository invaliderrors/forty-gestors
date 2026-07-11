import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSellersList } from '@/application/vendedores/useSellersList';
import { SellerCard } from '@/components/vendedores/SellerCard';
import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { LightBackground } from '@/components/shared/LightBackground';
import { LoadingDots } from '@/components/shared/LoadingDots';
import { vendedoresStyles as styles } from '@/styles/vendedores/vendedores.styles';
import { colors, spacing } from '@/theme';

/** Equipo de vendedores del gestor (fase 3.1 del PDF): vista clara full-bleed. */
export function VendedoresScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { state, busySellerId, toggleStatus } = useSellersList();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LightBackground />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xxxl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Volver"
            onPress={() => router.back()}
            hitSlop={8}
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
          >
            <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
          </Pressable>
          <View style={styles.headerText}>
            <Text style={styles.title}>Vendedores</Text>
            <Text style={styles.subtitle}>Tu equipo de venta en campo.</Text>
          </View>
        </View>

        {state.status === 'loading' ? (
          <View style={styles.loading}>
            <LoadingDots color={colors.textMuted} />
          </View>
        ) : null}

        {state.status === 'error' ? (
          <ClayNotice
            tone="error"
            message="No pudimos cargar tus vendedores. Vuelve a intentarlo."
          />
        ) : null}

        {state.status === 'ready' && state.sellers.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyBubble}>
              <Ionicons name="people-outline" size={32} color={colors.ctaDepth} />
            </View>
            <Text style={styles.emptyTitle}>Aún no tienes vendedores</Text>
            <Text style={styles.emptyMessage}>
              Invita a tus empleados, asígnales permisos específicos y deja que vendan tus boletas
              en campo.
            </Text>
          </View>
        ) : null}

        {state.status === 'ready' && state.sellers.length > 0 ? (
          <View style={styles.list}>
            {state.sellers.map((seller) => (
              <SellerCard
                key={seller.id}
                seller={seller}
                isBusy={busySellerId === seller.id}
                onToggleStatus={() => void toggleStatus(seller.id, seller.status)}
              />
            ))}
          </View>
        ) : null}

        <ClayButton label="Invitar vendedor" onPress={() => router.push('/invitar-vendedor')} />
      </ScrollView>
    </View>
  );
}
