import { OTHER_BRAND } from '@/domain/rifa/vehicles';

/**
 * Catálogo de "otro bien" para el plan de premios: subcategoría →
 * tipos → marcas frecuentes. Las listas de tipos terminan en
 * OTHER_KIND para bienes no contemplados (que exigen descripción).
 */
export const OTHER_KIND = 'Otro tipo';

export type OtherGoodDef = {
  label: string;
  /** Tipos concretos (nevera, celular...); si no hay, se pide descripción. */
  kinds?: readonly string[];
  /** Marcas frecuentes; si no hay, no se pide marca. */
  brands?: readonly string[];
  /** La descripción es obligatoria (viajes, bienes sin catálogo). */
  requiresDescription?: boolean;
  descriptionLabel?: string;
};

export const OTHER_GOOD_CATEGORIES: readonly OtherGoodDef[] = [
  {
    label: 'Electrodoméstico',
    kinds: [
      'Nevera',
      'Estufa',
      'Lavadora',
      'Secadora',
      'Televisor',
      'Aire acondicionado',
      'Horno microondas',
      'Lavavajillas',
      OTHER_KIND,
    ],
    brands: ['Samsung', 'LG', 'Whirlpool', 'Mabe', 'Haceb', 'Electrolux', 'Challenger', 'Kalley'],
  },
  {
    label: 'Tecnología',
    kinds: ['Celular', 'Portátil', 'Tablet', 'Consola de videojuegos', 'Cámara', 'Smartwatch', OTHER_KIND],
    brands: ['Samsung', 'Apple', 'Xiaomi', 'Motorola', 'Lenovo', 'HP', 'Sony', 'Nintendo'],
  },
  {
    label: 'Muebles y hogar',
    kinds: ['Juego de sala', 'Comedor', 'Juego de alcoba', 'Colchón', OTHER_KIND],
  },
  {
    label: 'Viaje',
    requiresDescription: true,
    descriptionLabel: 'Destino y detalles del plan',
  },
  {
    label: 'Efectivo',
  },
  {
    label: 'Otro',
    requiresDescription: true,
    descriptionLabel: 'Descripción del bien',
  },
];

export function otherGoodDef(label: string): OtherGoodDef | null {
  return OTHER_GOOD_CATEGORIES.find((def) => def.label === label) ?? null;
}

export function brandsForOtherGood(label: string): readonly string[] {
  const def = otherGoodDef(label);
  return def?.brands ? [...def.brands, OTHER_BRAND] : [];
}
