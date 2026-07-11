import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { FortuLogo } from '@/components/shared/FortuLogo';
import { prizeSummary, type PrizeSpec } from '@/domain/rifa/types';
import { formatCop } from '@/domain/shared/money';
import { ticketPreviewStyles as styles } from '@/styles/rifas/ticketPreview.styles';
import { colors } from '@/theme';

type TicketPreviewProps = {
  name: string;
  /** Plan de premios completo; el primero es el principal. */
  prizes: readonly PrizeSpec[];
  ticketPrice: number;
  drawDateDisplay: string;
};

/**
 * Ticket digital de la rifa (fase 2.2 del PDF): boleta de muestra con el
 * plan de premios y el sello de Coljuegos — que aparece "en trámite"
 * hasta que llegue la autorización real por el backend.
 */
export function TicketPreview({ name, prizes, ticketPrice, drawDateDisplay }: TicketPreviewProps) {
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

        <View style={styles.prizeList}>
          {prizes.map((prize, index) => (
            <View key={index} style={styles.prizeRow}>
              <Ionicons
                name={index === 0 ? 'trophy' : 'gift'}
                size={14}
                color={index === 0 ? colors.ctaDepth : colors.accentDeep}
                style={styles.prizeIcon}
              />
              <Text style={styles.prizeText}>{prizeSummary(prize) || 'Premio'}</Text>
              <Text style={styles.prizeValue}>{formatCop(prize.commercialValue)}</Text>
            </View>
          ))}
        </View>

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
