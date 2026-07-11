import { Text, View } from 'react-native';

import { ClayCard } from '@/components/shared/clay/ClayCard';
import { profileStatsStripStyles as styles } from '@/styles/perfil/profileStatsStrip.styles';

type StatCellProps = {
  value: string;
  label: string;
};

function StatCell({ value, label }: StatCellProps) {
  return (
    <View style={styles.cell}>
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <Text style={styles.label} numberOfLines={2}>
        {label}
      </Text>
    </View>
  );
}

type ProfileStatsStripProps = {
  activeRifas: number;
  soldTickets: number;
  collectedLabel: string;
};

/** Resumen del negocio del gestor (equivalente del ProfileStatsStrip de fortu-app). */
export function ProfileStatsStrip({
  activeRifas,
  soldTickets,
  collectedLabel,
}: ProfileStatsStripProps) {
  return (
    <ClayCard style={styles.card}>
      <StatCell value={String(activeRifas)} label="Rifas activas" />
      <View style={styles.divider} />
      <StatCell value={String(soldTickets)} label="Boletas vendidas" />
      <View style={styles.divider} />
      <StatCell value={collectedLabel} label="Recaudo" />
    </ClayCard>
  );
}
