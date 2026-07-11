import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSellersList } from '@/application/vendedores/useSellersList';
import { SellerCard } from '@/components/vendedores/SellerCard';
import { ClayButton } from '@/components/shared/clay/ClayButton';
import { ClayConfirmModal } from '@/components/shared/clay/ClayConfirmModal';
import { ClayNotice } from '@/components/shared/clay/ClayNotice';
import { LightBackground } from '@/components/shared/LightBackground';
import { LoadingDots } from '@/components/shared/LoadingDots';
import type { Seller, SellerStatus } from '@/domain/vendedores/types';
import { vendedoresStyles as styles } from '@/styles/vendedores/vendedores.styles';
import { colors, spacing } from '@/theme';

type SellerFilter = 'todos' | SellerStatus;

const FILTERS: readonly { value: SellerFilter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'activo', label: 'Activos' },
  { value: 'invitado', label: 'Pendientes' },
  { value: 'inactivo', label: 'Inactivos' },
];

/** Equipo de vendedores del gestor (fase 3.1 del PDF): vista clara full-bleed. */
export function VendedoresScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { state, busySellerId, toggleStatus, removeSeller } = useSellersList();
  const [filter, setFilter] = useState<SellerFilter>('todos');
  const [pendingDelete, setPendingDelete] = useState<Seller | null>(null);

  const allSellers = state.status === 'ready' ? state.sellers : [];
  const filteredSellers =
    filter === 'todos' ? allSellers : allSellers.filter((seller) => seller.status === filter);

  const confirmDelete = async () => {
    if (!pendingDelete) {
      return;
    }
    await removeSeller(pendingDelete.id);
    setPendingDelete(null);
  };

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

        {state.status === 'ready' && allSellers.length > 0 ? (
          <View style={styles.filterRow}>
            {FILTERS.map((entry) => {
              const isSelected = filter === entry.value;
              return (
                <Pressable
                  key={entry.value}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => setFilter(entry.value)}
                  style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                >
                  <Text style={[styles.filterLabel, isSelected && styles.filterLabelSelected]}>
                    {entry.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}

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

        {state.status === 'ready' && allSellers.length === 0 ? (
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

        {state.status === 'ready' && allSellers.length > 0 && filteredSellers.length === 0 ? (
          <Text style={styles.filterEmpty}>
            No tienes vendedores {FILTERS.find((entry) => entry.value === filter)?.label.toLowerCase()}.
          </Text>
        ) : null}

        {filteredSellers.length > 0 ? (
          <View style={styles.list}>
            {filteredSellers.map((seller) => (
              <SellerCard
                key={seller.id}
                seller={seller}
                isBusy={busySellerId === seller.id}
                onToggleStatus={() => void toggleStatus(seller.id, seller.status)}
                onDelete={() => setPendingDelete(seller)}
              />
            ))}
          </View>
        ) : null}

        <ClayButton label="Invitar vendedor" onPress={() => router.push('/invitar-vendedor')} />
      </ScrollView>

      <ClayConfirmModal
        visible={pendingDelete !== null}
        title={
          pendingDelete?.status === 'invitado' ? '¿Eliminar la invitación?' : '¿Eliminar vendedor?'
        }
        message={
          pendingDelete?.status === 'invitado'
            ? `La invitación de ${pendingDelete?.fullName ?? ''} dejará de ser válida y su código no podrá usarse.`
            : `${pendingDelete?.fullName ?? ''} perderá el acceso y saldrá de tu equipo. Esta acción no se puede deshacer.`
        }
        confirmLabel="Sí, eliminar"
        busy={pendingDelete !== null && busySellerId === pendingDelete.id}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setPendingDelete(null)}
      />
    </View>
  );
}
