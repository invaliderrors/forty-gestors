import type { Seller, SellerDraft } from '@/domain/vendedores/types';

/**
 * Puerto de vendedores del gestor. Hoy lo implementa MockSellerRepository;
 * la integración real creará el usuario del vendedor en la API (con sus
 * permisos) y enviará la invitación.
 */
export type SellerRepository = {
  list(): Promise<Seller[]>;
  invite(draft: SellerDraft): Promise<Seller>;
  setStatus(id: string, status: 'activo' | 'inactivo'): Promise<void>;
};
