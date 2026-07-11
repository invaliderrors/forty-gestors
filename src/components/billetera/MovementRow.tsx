import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import {
  MOVEMENT_DIRECTION,
  movementDateLabel,
  type WalletMovement,
} from '@/domain/billetera/types';
import { formatCop } from '@/domain/shared/money';
import { movementRowStyles as styles } from '@/styles/billetera/movementRow.styles';
import { colors } from '@/theme';

const KIND_CONFIG = {
  venta_digital: {
    icon: 'card-outline' as const,
    bubble: styles.iconDigital,
    color: colors.accentDeep,
  },
  venta_efectivo: {
    icon: 'cash-outline' as const,
    bubble: styles.iconCash,
    color: colors.ctaDepth,
  },
  comision: {
    icon: 'people-outline' as const,
    bubble: styles.iconCommission,
    color: colors.textSecondary,
  },
  remesa_operador: {
    icon: 'business-outline' as const,
    bubble: styles.iconRemittance,
    color: colors.danger,
  },
};

type MovementRowProps = {
  movement: WalletMovement;
};

/** Fila de un movimiento de la billetera. */
export function MovementRow({ movement }: MovementRowProps) {
  const config = KIND_CONFIG[movement.kind];
  const isIncome = MOVEMENT_DIRECTION[movement.kind] > 0;

  return (
    <View style={styles.row}>
      <View style={[styles.iconBubble, config.bubble]}>
        <Ionicons name={config.icon} size={18} color={config.color} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {movement.title}
        </Text>
        <Text style={styles.detail} numberOfLines={1}>
          {movement.detail}
        </Text>
      </View>
      <View style={styles.amountBlock}>
        <Text style={[styles.amount, isIncome ? styles.amountIn : styles.amountOut]}>
          {isIncome ? '+' : '−'} {formatCop(movement.amountCop)}
        </Text>
        <Text style={styles.date}>{movementDateLabel(movement.occurredAt)}</Text>
        {movement.kind === 'venta_efectivo' ? (
          <Text style={styles.pendingChip}>POR RENDIR</Text>
        ) : null}
      </View>
    </View>
  );
}
