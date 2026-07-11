import type { PickedFile } from '@/domain/media/types';

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
  vehicleType?: string;
  brand?: string;
  model?: string;
  year?: string;
  color?: string;
  /** Inmueble */
  city?: string;
  /** Otro bien: subcategoría (Electrodoméstico, Viaje...) y tipo (Nevera...). */
  otherCategory?: string;
  otherKind?: string;
  /** Inmueble / otro bien */
  description?: string;
  /** Precio de mercado; el plan completo debe cumplir el tope mínimo. */
  commercialValue: number;
};

/**
 * Premio del plan con sus soportes legales: declaración juramentada de
 * que el bien es nuevo (de paquete) y la factura de compra original del
 * concesionario o la constructora.
 */
export type RifaPrize = PrizeSpec & {
  swornDeclaration: boolean;
  invoice?: PickedFile;
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
  /** Plan de premios: el primero SIEMPRE es el principal (y el de mayor valor). */
  prizes: RifaPrize[];
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
  if (prize.otherCategory === 'Efectivo') {
    return ['Premio en efectivo', prize.description].filter(Boolean).join(' · ');
  }
  const kind =
    prize.otherKind && prize.otherKind !== 'Otro tipo' ? prize.otherKind : prize.otherCategory;
  return [kind, prize.brand, prize.description].filter(Boolean).join(' · ');
}

/** Valor total del plan de premios. */
export function totalPrizeValue(prizes: readonly PrizeSpec[]): number {
  return prizes.reduce((sum, prize) => sum + prize.commercialValue, 0);
}

/** ¿La categoría exige soportes (declaración juramentada + factura)? */
export function requiresOwnershipProof(category: PrizeCategory): boolean {
  return category === 'vehiculo' || category === 'inmueble';
}
