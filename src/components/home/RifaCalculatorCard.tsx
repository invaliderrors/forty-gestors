import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import type { RifaCalculator } from '@/application/rifa/useRifaCalculator';
import { ClayCard } from '@/components/shared/clay/ClayCard';
import { ClayTextInput } from '@/components/shared/clay/ClayTextInput';
import { formatThousands } from '@/domain/shared/money';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

type RifaCalculatorCardProps = {
  calculator: RifaCalculator;
};

/** Formulario de la emisión: cantidad de boletas × valor unitario, en su card clay. */
export function RifaCalculatorCard({ calculator }: RifaCalculatorCardProps) {
  return (
    <ClayCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconBubble}>
          <Ionicons name="calculator-outline" size={22} color={colors.textOnGold} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Configura tu rifa</Text>
          <Text style={styles.subtitle}>Parámetros de la emisión, la base de tu recaudo.</Text>
        </View>
      </View>

      <ClayTextInput
        label="Cantidad total de boletas"
        value={formatThousands(calculator.ticketCountRaw)}
        onChangeText={calculator.setTicketCount}
        placeholder="Ej: 9.999"
        keyboardType="number-pad"
        icon="pricetags-outline"
        helper="Número exacto de unidades a expedir para el sorteo."
      />
      <ClayTextInput
        label="Valor por boleta"
        value={formatThousands(calculator.ticketPriceRaw)}
        onChangeText={calculator.setTicketPrice}
        placeholder="Ej: 10.000"
        keyboardType="number-pad"
        icon="cash-outline"
        helper="Precio de venta al público por cada número."
      />
    </ClayCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBubble: {
    width: 46,
    height: 46,
    borderRadius: radii.lg,
    backgroundColor: colors.ctaFace,
    borderBottomWidth: 3,
    borderBottomColor: colors.ctaDepth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.displaySoft,
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
    marginTop: 1,
  },
});
