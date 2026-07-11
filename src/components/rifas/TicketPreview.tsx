import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { FortuLogo } from '@/components/shared/FortuLogo';
import { prizeCategoryLabel, prizeSummary, type PrizeSpec } from '@/domain/rifa/types';
import { formatCop } from '@/domain/shared/money';
import { ticketPreviewStyles as styles } from '@/styles/rifas/ticketPreview.styles';
import { colors } from '@/theme';

type TicketPreviewProps = {
  name: string;
  /** Premio principal del plan. */
  prize: PrizeSpec;
  /** Cantidad de premios adicionales al principal. */
  additionalPrizeCount?: number;
  ticketPrice: number;
  drawDateDisplay: string;
};

/**
 * Ticket digital de la rifa (fase 2.2 del PDF): boleta de muestra con la
 * información técnica del premio y el sello de Coljuegos — que aparece
 * "en trámite" hasta que llegue la autorización real por el backend.
 */
export function TicketPreview({
  name,
  prize,
  additionalPrizeCount = 0,
  ticketPrice,
  drawDateDisplay,
}: TicketPreviewProps) {
  const summary = prizeSummary(prize);

  return (
    <View style={styles.ticket}>
      <View style={styles.header}>
        <FortuLogo size={18} />
        <Text style={styles.headerLabel}>Boleta digital</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.prize} numberOfLines={2}>
          {prizeCategoryLabel(prize.category)}
          {summary ? ` — ${summary}` : ''} · {formatCop(prize.commercialValue)}
          {additionalPrizeCount > 0
            ? ` · +${additionalPrizeCount} premio${additionalPrizeCount > 1 ? 's' : ''} más`
            : ''}
        </Text>
        <View style={styles.detailsRow}>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Sorteo</Text>
            <Text style={styles.detailValue}>{drawDateDisplay}</Text>
          </View>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Valor boleta</Text>
            <Text style={styles.detailValue}>{formatCop(ticketPrice)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.perforation}>
        {Array.from({ length: 14 }, (_, index) => (
          <View key={index} style={styles.perforationDot} />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.sampleNumber}>Nº 0001</Text>
        <View style={styles.sealBadge}>
          <Ionicons name="ribbon-outline" size={13} color={colors.ctaDepth} />
          <Text style={styles.sealLabel}>Autorización Coljuegos en trámite</Text>
        </View>
      </View>
    </View>
  );
}
