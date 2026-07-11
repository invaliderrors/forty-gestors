import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { InvitationTemplate } from '@/components/vendedores/InvitationTemplate';
import { ClayCard } from '@/components/shared/clay/ClayCard';
import { LoadingDots } from '@/components/shared/LoadingDots';
import {
  SELLER_PERMISSIONS,
  SELLER_STATUS_LABEL,
  sellerInitials,
  type Seller,
} from '@/domain/vendedores/types';
import { useInvitationShare } from '@/hooks/vendedores/useInvitationShare';
import { useSession } from '@/providers/SessionProvider';
import { sellerCardStyles as styles } from '@/styles/vendedores/sellerCard.styles';
import { colors } from '@/theme';

type SellerCardProps = {
  seller: Seller;
  isBusy: boolean;
  onToggleStatus: () => void;
  onDelete: () => void;
};

/** Card compacta de un vendedor: identidad, estado, stats simétricas y acciones. */
export function SellerCard({ seller, isBusy, onToggleStatus, onDelete }: SellerCardProps) {
  const { session } = useSession();
  const invitationShare = useInvitationShare();

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
        <View style={styles.rightColumn}>
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
          {isBusy ? (
            <LoadingDots color={colors.textMuted} size={4} />
          ) : (
            <View style={styles.actionsRow}>
              {seller.status !== 'invitado' ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    seller.status === 'inactivo' ? 'Activar vendedor' : 'Desactivar vendedor'
                  }
                  onPress={onToggleStatus}
                  hitSlop={8}
                  style={({ pressed }) => [styles.actionLink, pressed && styles.actionPressed]}
                >
                  <Text
                    style={[
                      styles.actionLabel,
                      seller.status === 'inactivo'
                        ? styles.actionActivate
                        : styles.actionDeactivate,
                    ]}
                  >
                    {seller.status === 'inactivo' ? 'Activar' : 'Desactivar'}
                  </Text>
                </Pressable>
              ) : null}
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={
                  seller.status === 'invitado' ? 'Eliminar invitación' : 'Eliminar vendedor'
                }
                onPress={onDelete}
                hitSlop={8}
                style={({ pressed }) => [styles.trashButton, pressed && styles.actionPressed]}
              >
                <Ionicons name="trash-outline" size={15} color={colors.danger} />
              </Pressable>
            </View>
          )}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <View style={styles.statBlock}>
          <Text style={styles.statLabel}>Número</Text>
          <Text style={styles.statValue}>{seller.id}</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.statLabel}>Comisión</Text>
          <Text style={styles.statValue}>
            {seller.commissionPercent > 0 ? `${seller.commissionPercent}%` : '—'}
          </Text>
        </View>
        <View style={[styles.statBlock, styles.statBlockEnd]}>
          <Text style={styles.statLabel}>Vendidas</Text>
          <Text style={styles.statValue}>{seller.soldTickets}</Text>
        </View>
      </View>

      {permissionLabels ? (
        <Text style={styles.permissionsLine} numberOfLines={1}>
          Permisos: {permissionLabels}
        </Text>
      ) : null}

      {seller.status === 'invitado' ? (
        <>
          <View style={styles.codeRow}>
            <View style={styles.codeBlock}>
              <Text style={styles.codeLabel}>Código de invitación</Text>
              <Text style={styles.codeValue}>{seller.invitationCode}</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Compartir invitación"
              onPress={() => void invitationShare.share()}
              disabled={invitationShare.isSharing}
              hitSlop={8}
              style={({ pressed }) => [styles.shareButton, pressed && styles.sharePressed]}
            >
              {invitationShare.isSharing ? (
                <LoadingDots color={colors.textOnGold} size={4} />
              ) : (
                <Ionicons name="share-social" size={18} color={colors.textOnGold} />
              )}
            </Pressable>
          </View>
          <InvitationTemplate
            viewRef={invitationShare.templateRef}
            sellerName={seller.fullName}
            gestorName={session?.displayName ?? 'Tu gestor'}
            invitationCode={seller.invitationCode}
          />
        </>
      ) : null}
    </ClayCard>
  );
}
