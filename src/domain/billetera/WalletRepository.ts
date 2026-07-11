import type { WalletMovement } from '@/domain/billetera/types';

/**
 * Puerto de la billetera. Hoy lo implementa MockWalletRepository con
 * datos de demostración; la integración real traerá los movimientos de
 * las ventas de boletas (digital y efectivo), comisiones y remesas.
 */
export type WalletRepository = {
  getMovements(): Promise<WalletMovement[]>;
};
