import type { Session } from '@/domain/auth/types';
import type { Seller, SellerDraft } from '@/domain/vendedores/types';

/**
 * Puerto de vendedores. Del lado del gestor: listar, invitar, cambiar
 * estado y eliminar. Del lado del vendedor: canjear el código de
 * invitación para activar su cuenta (el PDF solo dice que el gestor
 * "crea usuarios"; la mecánica de activación por código es diseño
 * propio, a validar con producto).
 */
export type SellerRepository = {
  list(): Promise<Seller[]>;
  invite(draft: SellerDraft): Promise<Seller>;
  setStatus(id: string, status: 'activo' | 'inactivo'): Promise<void>;
  remove(id: string): Promise<void>;
  /** Busca una invitación PENDIENTE por su código (null si no existe o ya se usó). */
  findByInvitationCode(code: string): Promise<Seller | null>;
  /** Activa la cuenta del vendedor con su código y contraseña; devuelve la sesión. */
  activate(code: string, password: string): Promise<Session>;
};
