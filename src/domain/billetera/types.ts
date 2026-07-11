/**
 * Dominio de la billetera del gestor (fase 3.2 del PDF): ingresos,
 * tesorería, comisiones, conciliación efectivo/digital y trazabilidad
 * de lo enviado al Operador y Coljuegos.
 */

export type MovementKind =
  /** Venta de boletas cobrada por medios digitales (entra a la caja). */
  | 'venta_digital'
  /** Venta cobrada en efectivo por un vendedor (pendiente de rendir). */
  | 'venta_efectivo'
  /** Comisión pagada a un vendedor. */
  | 'comision'
  /** Derechos de explotación remesados al Operador para Coljuegos. */
  | 'remesa_operador';

/** Sentido del movimiento sobre la caja disponible. */
export const MOVEMENT_DIRECTION: Record<MovementKind, 1 | -1> = {
  venta_digital: 1,
  venta_efectivo: 1,
  comision: -1,
  remesa_operador: -1,
};

export type WalletMovement = {
  id: string;
  kind: MovementKind;
  title: string;
  detail: string;
  /** Valor absoluto en COP; el sentido lo da MOVEMENT_DIRECTION. */
  amountCop: number;
  occurredAt: string;
};

export type WalletSummary = {
  /** Digital cobrado − comisiones − remesas (tesorería disponible). */
  availableCop: number;
  digitalCop: number;
  /** Efectivo en manos de vendedores, pendiente de rendir. */
  cashPendingCop: number;
  commissionsCop: number;
  /** Derechos de explotación ya enviados al Operador y Coljuegos. */
  remittedCop: number;
};

/** Resumen de tesorería a partir de los movimientos (pura, testeable). */
export function computeWalletSummary(movements: readonly WalletMovement[]): WalletSummary {
  const sumBy = (kind: MovementKind) =>
    movements
      .filter((movement) => movement.kind === kind)
      .reduce((sum, movement) => sum + movement.amountCop, 0);

  const digitalCop = sumBy('venta_digital');
  const cashPendingCop = sumBy('venta_efectivo');
  const commissionsCop = sumBy('comision');
  const remittedCop = sumBy('remesa_operador');

  return {
    availableCop: Math.max(0, digitalCop - commissionsCop - remittedCop),
    digitalCop,
    cashPendingCop,
    commissionsCop,
    remittedCop,
  };
}

/** Fecha corta para las filas de movimientos: "08/07 · 15:24". */
export function movementDateLabel(iso: string): string {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month} · ${hours}:${minutes}`;
}
