import type { RifaRepository } from '@/domain/rifa/RifaRepository';
import type { Rifa, RifaDraft } from '@/domain/rifa/types';
import { createRifaNumber, mockDb, simulateLatency } from '@/infrastructure/mock/mockDb';

/**
 * Implementación mock de rifas: guarda en memoria y deja cada rifa
 * "en revisión" (la autorización de Coljuegos llegará por el backend).
 */
export class MockRifaRepository implements RifaRepository {
  async list(): Promise<Rifa[]> {
    await simulateLatency(350);
    return [...mockDb.rifas].reverse();
  }

  async create(draft: RifaDraft): Promise<Rifa> {
    await simulateLatency(1000);
    const rifa: Rifa = {
      ...draft,
      id: createRifaNumber(),
      status: 'en_revision',
      soldTickets: 0,
      createdAt: new Date().toISOString(),
    };
    mockDb.rifas.push(rifa);
    return rifa;
  }
}
