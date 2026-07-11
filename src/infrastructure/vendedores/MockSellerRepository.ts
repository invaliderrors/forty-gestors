import type { SellerRepository } from '@/domain/vendedores/SellerRepository';
import type { Seller, SellerDraft } from '@/domain/vendedores/types';
import { createSellerNumber, mockDb, simulateLatency } from '@/infrastructure/mock/mockDb';

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function createInvitationCode(): string {
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return code;
}

/**
 * Implementación mock de vendedores: en memoria, con código de
 * invitación generado localmente. El backend real enviará la invitación
 * al vendedor y activará su cuenta al canjearla.
 */
export class MockSellerRepository implements SellerRepository {
  async list(): Promise<Seller[]> {
    await simulateLatency(350);
    return [...mockDb.sellers].reverse();
  }

  async invite(draft: SellerDraft): Promise<Seller> {
    await simulateLatency(900);
    const seller: Seller = {
      ...draft,
      id: createSellerNumber(),
      status: 'invitado',
      invitationCode: createInvitationCode(),
      soldTickets: 0,
      createdAt: new Date().toISOString(),
    };
    mockDb.sellers.push(seller);
    return seller;
  }

  async setStatus(id: string, status: 'activo' | 'inactivo'): Promise<void> {
    await simulateLatency(400);
    const seller = mockDb.sellers.find((entry) => entry.id === id);
    if (seller) {
      seller.status = status;
    }
  }
}
