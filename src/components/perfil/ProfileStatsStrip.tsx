import { StyleSheet, Text, View } from 'react-native';

import { ClayCard } from '@/components/shared/clay/ClayCard';
import { colors, fonts, fontSizes, spacing } from '@/theme';

type StatCellProps = {
  value: string;
  label: string;
};

function StatCell({ value, label }: StatCellProps) {
  return (
    <View style={styles.cell}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
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

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.surfaceBorder,
  },
  value: {
    fontFamily: fonts.display,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.micro,
    color: colors.textSecondary,
  },
});
