import { InvalidInvitationCodeError } from '@/domain/auth/errors';
import type { Session } from '@/domain/auth/types';
import type { SellerRepository } from '@/domain/vendedores/SellerRepository';
import type { Seller, SellerDraft } from '@/domain/vendedores/types';
import {
  createMockId,
  createSellerNumber,
  mockDb,
  simulateLatency,
} from '@/infrastructure/mock/mockDb';

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

  async remove(id: string): Promise<void> {
    await simulateLatency(400);
    mockDb.sellers = mockDb.sellers.filter((entry) => entry.id !== id);
  }

  async findByInvitationCode(code: string): Promise<Seller | null> {
    await simulateLatency(500);
    return (
      mockDb.sellers.find(
        (entry) => entry.invitationCode === code.trim().toUpperCase() && entry.status === 'invitado',
      ) ?? null
    );
  }

  async activate(code: string, password: string): Promise<Session> {
    await simulateLatency(900);
    const seller = mockDb.sellers.find(
      (entry) => entry.invitationCode === code.trim().toUpperCase() && entry.status === 'invitado',
    );
    if (!seller) {
      throw new InvalidInvitationCodeError();
    }
    seller.status = 'activo';
    const userId = createMockId('usr');
    mockDb.users.set(seller.email, {
      userId,
      email: seller.email,
      password,
      displayName: seller.fullName,
    });
    return { userId, email: seller.email, displayName: seller.fullName };
  }
}
