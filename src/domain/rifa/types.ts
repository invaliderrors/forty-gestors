/**
 * Dominio de la rifa del gestor (fases 1.1 y 2.2 del PDF): parámetros de
 * la emisión + plan de premios por categoría de bien.
 */

/** Categoría del bien a rifar (selector del plan de premios). */
export type PrizeCategory = 'vehiculo' | 'inmueble' | 'otro';

export const PRIZE_CATEGORIES: readonly { value: PrizeCategory; label: string; hint: string }[] = [
  { value: 'vehiculo', label: 'Vehículo', hint: 'Carro o moto' },
  { value: 'inmueble', label: 'Inmueble', hint: 'Casa, apartamento o lote' },
  { value: 'otro', label: 'Otro bien', hint: 'Electrodomésticos, viajes, efectivo...' },
];

export function prizeCategoryLabel(category: PrizeCategory): string {
  return PRIZE_CATEGORIES.find((entry) => entry.value === category)?.label ?? '';
}

/** Especificaciones técnicas del premio, según la categoría. */
export type PrizeSpec = {
  category: PrizeCategory;
  /** Vehículo */
  brand?: string;
  model?: string;
  year?: string;
  color?: string;
  /** Inmueble */
  city?: string;
  /** Inmueble / otro bien */
  description?: string;
  /** Precio de mercado; debe cumplir el tope mínimo respecto a la emisión. */
  commercialValue: number;
};

export type RifaStatus = 'en_revision' | 'autorizada' | 'activa';

export const RIFA_STATUS_LABEL: Record<RifaStatus, string> = {
  en_revision: 'En revisión',
  autorizada: 'Autorizada',
  activa: 'Activa',
};

export type RifaDraft = {
  name: string;
  ticketCount: number;
  ticketPrice: number;
  /** Fecha del sorteo en ISO (AAAA-MM-DD). */
  drawDate: string;
  prize: PrizeSpec;
};

export type Rifa = RifaDraft & {
  /** Número institucional: RF-AAAAMM-consecutivo. */
  id: string;
  status: RifaStatus;
  soldTickets: number;
  createdAt: string;
};

/** Resumen del premio para listados y el ticket digital. */
export function prizeSummary(prize: PrizeSpec): string {
  if (prize.category === 'vehiculo') {
    return [prize.brand, prize.model, prize.year, prize.color].filter(Boolean).join(' · ');
  }
  if (prize.category === 'inmueble') {
    return [prize.description, prize.city].filter(Boolean).join(' · ');
  }
  return prize.description ?? '';
}
