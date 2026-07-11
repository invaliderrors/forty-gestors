import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { ConfettiRain } from '@/components/home/ConfettiRain';
import { AVAILABLE_INSURERS, type RifaProjection as Projection } from '@/domain/rifa/normative';
import { formatCop } from '@/domain/shared/money';
import { clayShadow, colors, fonts, fontSizes, radii, spacing } from '@/theme';

function ProjectionRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={17} color={colors.accentDeep} />
      </View>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

type RifaProjectionProps = {
  projection: Projection;
};

/** La información que Fortu le entrega al gestor a partir de su emisión. */
export function RifaProjection({ projection }: RifaProjectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>Fortu te entrega esta información</Text>

      <View style={styles.numbersCard}>
        <ProjectionRow
          icon="albums-outline"
          label="Tu emisión total es de"
          value={formatCop(projection.emissionTotal)}
        />
        <View style={styles.divider} />
        <ProjectionRow
          icon="trophy-outline"
          label="El valor de tu premio no debe ser menor a"
          value={formatCop(projection.prizeMinimum)}
        />
        <View style={styles.divider} />
        <ProjectionRow
          icon="business-outline"
          label="Valor de los derechos de explotación"
          value={formatCop(projection.explotacionRights)}
        />
        <View style={styles.divider} />
        <ProjectionRow
          icon="shield-checkmark-outline"
          label="Costo aproximado de la póliza de cumplimiento"
          value={formatCop(projection.insuranceCost)}
        />
      </View>

      <View style={styles.insurersCard}>
        <Text style={styles.insurersLabel}>Pólizas disponibles para este sorteo</Text>
        <View style={styles.insurersRow}>
          {AVAILABLE_INSURERS.map((insurer) => (
            <View key={insurer} style={styles.insurerChip}>
              <Ionicons name="shield-half-outline" size={13} color={colors.accentDeep} />
              <Text style={styles.insurerName}>{insurer}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.earningsCard, clayShadow.goldCta]}>
        <ConfettiRain fieldHeight={200} />
        <Text style={styles.earningsEyebrow}>
          Con base en tus derechos de explotación y tras la autorización de tu rifa por Coljuegos
        </Text>
        <Text style={styles.earningsLabel}>Tus ganancias aproximadas podrán ser de</Text>
        <Text style={styles.earningsValue}>{formatCop(projection.estimatedEarnings)}</Text>
        <View style={styles.earningsBadge}>
          <Ionicons name="sparkles" size={13} color={colors.textOnGold} />
          <Text style={styles.earningsBadgeLabel}>¡A romper la alcancía!</Text>
        </View>
      </View>

      <View style={styles.healthCard}>
        <View style={styles.healthIcon}>
          <Ionicons name="heart" size={20} color={colors.surface} />
        </View>
        <Text style={styles.healthText}>
          Con tu pago estarás aportando{' '}
          <Text style={styles.healthAmount}>{formatCop(projection.healthContribution)}</Text> a la
          salud de los colombianos. {'\n'}
          <Text style={styles.healthSlogan}>¡Jugar legal es apostarle a la salud!</Text>
        </Text>
      </View>

      <Text style={styles.disclaimer}>
        Cálculos de referencia según tu emisión. Los valores definitivos se confirman con la
        autorización de Coljuegos y la cotización de la aseguradora.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  sectionLabel: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  numbersCard: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    backgroundColor: colors.accentSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  rowValue: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceBorder,
  },
  insurersCard: {
    gap: spacing.md,
  },
  insurersLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
  },
  insurersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  insurerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.accentSoftBg,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  insurerName: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.micro,
    color: colors.accentDeep,
  },
  earningsCard: {
    backgroundColor: colors.ctaFace,
    borderRadius: radii.xxl,
    borderBottomWidth: 6,
    borderBottomColor: colors.ctaDepth,
    padding: spacing.xxl,
    alignItems: 'center',
    gap: spacing.sm,
    overflow: 'hidden',
  },
  earningsEyebrow: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.micro,
    lineHeight: 15,
    color: 'rgba(10,25,49,0.75)',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  earningsLabel: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.caption,
    color: colors.textOnGold,
    textAlign: 'center',
  },
  earningsValue: {
    fontFamily: fonts.display,
    fontSize: 36,
    color: colors.textOnGold,
    textAlign: 'center',
  },
  earningsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.45)',
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
  },
  earningsBadgeLabel: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.micro,
    color: colors.textOnGold,
  },
  healthCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.accentSoftBg,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: colors.accent,
    padding: spacing.lg,
  },
  healthIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSizes.caption,
    lineHeight: 19,
    color: colors.textSecondary,
  },
  healthAmount: {
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },
  healthSlogan: {
    fontFamily: fonts.bold,
    color: colors.accentDeep,
  },
  disclaimer: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.micro,
    lineHeight: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
