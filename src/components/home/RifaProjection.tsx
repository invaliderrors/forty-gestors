import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { ConfettiRain } from '@/components/home/ConfettiRain';
import { AVAILABLE_INSURERS, type RifaProjection as Projection } from '@/domain/rifa/normative';
import { formatCop } from '@/domain/shared/money';
import { rifaProjectionStyles as styles } from '@/styles/home/rifaProjection.styles';
import { clayShadow, colors } from '@/theme';

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
