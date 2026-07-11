import type { WalletRepository } from '@/domain/billetera/WalletRepository';
import type { WalletMovement } from '@/domain/billetera/types';
import { createMockId, mockDb, simulateLatency } from '@/infrastructure/mock/mockDb';

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 3_600_000).toISOString();
}

/**
 * Siembra movimientos de demostración coherentes; usa los nombres de las
 * rifas y vendedores reales del mock cuando existen para que la vista se
 * sienta propia. El backend real reemplaza todo esto.
 */
function seedMovements(): WalletMovement[] {
  const rifaName = mockDb.rifas[0]?.name ?? 'Gran rifa Renault Logan';
  const sellerName = mockDb.sellers[0]?.fullName.split(' ')[0] ?? 'Carlos';

  return [
    {
      id: createMockId('mov'),
      kind: 'venta_digital',
      title: 'Venta de 3 boletas',
      detail: `${rifaName} · Nequi`,
      amountCop: 30_000,
      occurredAt: hoursAgo(2),
    },
    {
      id: createMockId('mov'),
      kind: 'venta_efectivo',
      title: 'Venta de 5 boletas en efectivo',
      detail: `${rifaName} · Vendedor ${sellerName}`,
      amountCop: 50_000,
      occurredAt: hoursAgo(5),
    },
    {
      id: createMockId('mov'),
      kind: 'venta_digital',
      title: 'Venta de 12 boletas',
      detail: `${rifaName} · PSE`,
      amountCop: 120_000,
      occurredAt: hoursAgo(26),
    },
    {
      id: createMockId('mov'),
      kind: 'comision',
      title: `Comisión de ${sellerName}`,
      detail: '10% sobre ventas de la semana',
      amountCop: 17_000,
      occurredAt: hoursAgo(30),
    },
    {
      id: createMockId('mov'),
      kind: 'venta_efectivo',
      title: 'Venta de 8 boletas en efectivo',
      detail: `${rifaName} · Vendedor ${sellerName}`,
      amountCop: 80_000,
      occurredAt: hoursAgo(49),
    },
    {
      id: createMockId('mov'),
      kind: 'remesa_operador',
      title: 'Derechos de explotación',
      detail: 'Remesa al Operador para Coljuegos',
      amountCop: 42_000,
      occurredAt: hoursAgo(72),
    },
    {
      id: createMockId('mov'),
      kind: 'venta_digital',
      title: 'Venta de 15 boletas',
      detail: `${rifaName} · Tarjeta`,
      amountCop: 150_000,
      occurredAt: hoursAgo(78),
    },
  ];
}

export class MockWalletRepository implements WalletRepository {
  async getMovements(): Promise<WalletMovement[]> {
    await simulateLatency(400);
    if (mockDb.walletMovements.length === 0) {
      mockDb.walletMovements = seedMovements();
    }
    return [...mockDb.walletMovements];
  }
}
