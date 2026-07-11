/**
 * Dominio de vendedores (fase 3.1 del PDF): el gestor crea usuarios para
 * sus empleados con permisos específicos; ellos venden en campo.
 */

export type SellerPermission = 'vender' | 'recibir_efectivo' | 'ver_reportes';

export const SELLER_PERMISSIONS: readonly {
  value: SellerPermission;
  label: string;
  hint: string;
}[] = [
  {
    value: 'vender',
    label: 'Vender boletas',
    hint: 'Registrar ventas en campo con los datos del comprador.',
  },
  {
    value: 'recibir_efectivo',
    label: 'Recibir pagos en efectivo',
    hint: 'Cobrar en efectivo y rendir el recaudo al gestor.',
  },
  {
    value: 'ver_reportes',
    label: 'Ver sus reportes',
    hint: 'Consultar sus propias ventas y comisiones.',
  },
];

export type SellerStatus = 'invitado' | 'activo' | 'inactivo';

export const SELLER_STATUS_LABEL: Record<SellerStatus, string> = {
  invitado: 'Invitación pendiente',
  activo: 'Activo',
  inactivo: 'Inactivo',
};

export type SellerDraft = {
  fullName: string;
  docNumber: string;
  phone: string;
  email: string;
  permissions: SellerPermission[];
  /** % de comisión sobre cada boleta vendida (visualización de comisiones del PDF). */
  commissionPercent: number;
};

export type Seller = SellerDraft & {
  /** Número institucional: VD-AAAAMM-consecutivo. */
  id: string;
  status: SellerStatus;
  /** Código que el vendedor usa para activar su cuenta en su app. */
  invitationCode: string;
  soldTickets: number;
  createdAt: string;
};

/** Iniciales para el avatar del vendedor. */
export function sellerInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '';
  return `${first}${last}`.toUpperCase() || '?';
}
