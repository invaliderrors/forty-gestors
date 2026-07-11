import type { Rifa, RifaDraft } from '@/domain/rifa/types';

/**
 * Puerto de rifas del gestor. Hoy lo implementa MockRifaRepository; la
 * integración real creará la rifa en la API (que la deja en revisión
 * hasta la autorización de Coljuegos y la publica en el marketplace).
 */
export type RifaRepository = {
  list(): Promise<Rifa[]>;
  create(draft: RifaDraft): Promise<Rifa>;
};
