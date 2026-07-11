import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { ClayCard } from '@/components/shared/clay/ClayCard';
import { LoadingDots } from '@/components/shared/LoadingDots';
import {
  SELLER_PERMISSIONS,
  SELLER_STATUS_LABEL,
  sellerInitials,
  type Seller,
} from '@/domain/vendedores/types';
import { sellerCardStyles as styles } from '@/styles/vendedores/sellerCard.styles';
import { colors } from '@/theme';

type SellerCardProps = {
  seller: Seller;
  isBusy: boolean;
  onToggleStatus: () => void;
};

/** Card de un vendedor: identidad, estado, permisos, comisión y acciones. */
export function SellerCard({ seller, isBusy, onToggleStatus }: SellerCardProps) {
  const statusChipStyle =
    seller.status === 'invitado'
      ? styles.statusChipInvitado
      : seller.status === 'activo'
        ? styles.statusChipActivo
        : styles.statusChipInactivo;
  const statusLabelStyle =
    seller.status === 'invitado'
      ? styles.statusLabelInvitado
      : seller.status === 'activo'
        ? styles.statusLabelActivo
        : styles.statusLabelInactivo;

  const permissionLabels = SELLER_PERMISSIONS.filter((entry) =>
    seller.permissions.includes(entry.value),
  )
    .map((entry) => entry.label)
    .join(' · ');

  return (
    <ClayCard style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitials}>{sellerInitials(seller.fullName)}</Text>
        </View>
        <View style={styles.identity}>
          <Text style={styles.name} numberOfLines={1}>
            {seller.fullName}
          </Text>
          <Text style={styles.phone}>{seller.phone}</Text>
        </View>
        <View style={[styles.statusChip, statusChipStyle]}>
          <Ionicons
            name={
              seller.status === 'invitado'
                ? 'mail-unread-outline'
                : seller.status === 'activo'
                  ? 'checkmark-circle'
                  : 'pause-circle'
            }
            size={12}
            color={
              seller.status === 'invitado'
                ? colors.accentDeep
                : seller.status === 'activo'
                  ? colors.successDeep
                  : colors.textMuted
            }
          />
          <Text style={[styles.statusLabel, statusLabelStyle]}>
            {SELLER_STATUS_LABEL[seller.status]}
          </Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        {seller.commissionPercent > 0 ? (
          <View style={styles.metaChip}>
            <Ionicons name="cash-outline" size={12} color={colors.textSecondary} />
            <Text style={styles.metaLabel}>{seller.commissionPercent}% comisión</Text>
          </View>
        ) : null}
        <View style={styles.metaChip}>
          <Ionicons name="ticket-outline" size={12} color={colors.textSecondary} />
          <Text style={styles.metaLabel}>{seller.soldTickets} boletas vendidas</Text>
        </View>
        <View style={styles.metaChip}>
          <Ionicons name="document-text-outline" size={12} color={colors.textSecondary} />
          <Text style={styles.metaLabel}>{seller.id}</Text>
        </View>
      </View>

      {permissionLabels ? (
        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Ionicons name="key-outline" size={12} color={colors.textSecondary} />
            <Text style={styles.metaLabel}>{permissionLabels}</Text>
          </View>
        </View>
      ) : null}

      {seller.status === 'invitado' ? (
        <View style={styles.codeRow}>
          <Text style={styles.codeLabel}>
            Comparte este código con tu vendedor para que active su cuenta:
          </Text>
          <Text style={styles.codeValue}>{seller.invitationCode}</Text>
        </View>
      ) : null}

      <View style={styles.actionRow}>
        {isBusy ? (
          <LoadingDots color={colors.textMuted} size={5} />
        ) : (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={seller.status === 'inactivo' ? 'Activar vendedor' : 'Desactivar vendedor'}
            onPress={onToggleStatus}
            hitSlop={8}
            style={({ pressed }) => [styles.actionButton, pressed && styles.actionPressed]}
          >
            <Text
              style={[
                styles.actionLabel,
                seller.status === 'inactivo' ? styles.actionActivate : styles.actionDeactivate,
              ]}
            >
              {seller.status === 'inactivo' ? 'Activar' : 'Desactivar'}
            </Text>
          </Pressable>
        )}
      </View>
    </ClayCard>
  );
}
