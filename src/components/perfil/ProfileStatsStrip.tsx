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

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    // Alineación por el tope: si una etiqueta ocupa dos líneas, los
    // valores de las tres celdas siguen en la misma línea base.
    alignItems: 'flex-start',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: spacing.xs,
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.surfaceBorder,
  },
  value: {
    fontFamily: fonts.display,
    fontSize: fontSizes.subtitle,
    lineHeight: 24,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.micro,
    lineHeight: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
