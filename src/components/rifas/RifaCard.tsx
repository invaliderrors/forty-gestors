import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { ClayCard } from '@/components/shared/clay/ClayCard';
import { prizeSummary, RIFA_STATUS_LABEL, type Rifa } from '@/domain/rifa/types';
import { drawDateToDisplay } from '@/domain/rifa/validators';
import { formatCop } from '@/domain/shared/money';
import { rifaCardStyles as styles } from '@/styles/rifas/rifaCard.styles';
import { colors } from '@/theme';

type RifaCardProps = {
  rifa: Rifa;
};

/** Card del listado de rifas: estado, sorteo, emisión y avance de venta. */
export function RifaCard({ rifa }: RifaCardProps) {
  const isRevision = rifa.status === 'en_revision';
  const soldRatio = rifa.ticketCount > 0 ? rifa.soldTickets / rifa.ticketCount : 0;
  const summary = prizeSummary(rifa.prize);

  return (
    <ClayCard style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.name} numberOfLines={1}>
          {rifa.name}
        </Text>
        <View
          style={[styles.statusChip, isRevision ? styles.statusChipRevision : styles.statusChipOk]}
        >
          <Ionicons
            name={isRevision ? 'time-outline' : 'checkmark-circle'}
            size={12}
            color={isRevision ? colors.ctaDepth : colors.successDeep}
          />
          <Text
            style={[
              styles.statusLabel,
              isRevision ? styles.statusLabelRevision : styles.statusLabelOk,
            ]}
          >
            {RIFA_STATUS_LABEL[rifa.status]}
          </Text>
        </View>
      </View>

      {summary ? (
        <Text style={styles.prizeSummary} numberOfLines={2}>
          Premio: {summary} · {formatCop(rifa.prize.commercialValue)}
        </Text>
      ) : null}

      <View style={styles.metaRow}>
        <View style={styles.metaChip}>
          <Ionicons name="calendar-outline" size={12} color={colors.textSecondary} />
          <Text style={styles.metaLabel}>Sorteo {drawDateToDisplay(rifa.drawDate)}</Text>
        </View>
        <View style={styles.metaChip}>
          <Ionicons name="pricetags-outline" size={12} color={colors.textSecondary} />
          <Text style={styles.metaLabel}>
            {formatCop(rifa.ticketPrice)} × {rifa.ticketCount}
          </Text>
        </View>
        <View style={styles.metaChip}>
          <Ionicons name="document-text-outline" size={12} color={colors.textSecondary} />
          <Text style={styles.metaLabel}>{rifa.id}</Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.round(soldRatio * 100)}%` }]} />
      </View>
      <Text style={styles.progressLabel}>
        {rifa.soldTickets} de {rifa.ticketCount} boletas vendidas
      </Text>
    </ClayCard>
  );
}
