/**
 * Taxonomía de vehículos para el plan de premios (misma clasificación
 * que usan los marketplaces colombianos) y marcas frecuentes por tipo.
 * Toda lista de marcas termina en OTHER_BRAND para permitir marcas que
 * no estén contempladas.
 */
export const OTHER_BRAND = 'Otra marca';

export const VEHICLE_TYPES = [
  'Carros y Camionetas',
  'Motos',
  'Camiones',
  'Otros Vehículos',
  'Maquinaria Pesada',
  'Carros de Colección',
  'Náutica',
] as const;

export type VehicleType = (typeof VEHICLE_TYPES)[number];

const BRANDS_BY_TYPE: Record<VehicleType, readonly string[]> = {
  'Carros y Camionetas': [
    'Chevrolet',
    'Renault',
    'Mazda',
    'Toyota',
    'Kia',
    'Hyundai',
    'Nissan',
    'Suzuki',
    'Ford',
    'Volkswagen',
    'BYD',
    'Mercedes-Benz',
    'BMW',
    'Audi',
  ],
  Motos: ['AKT', 'Bajaj', 'Honda', 'Yamaha', 'Suzuki', 'TVS', 'Hero', 'KTM', 'Kawasaki', 'Ducati'],
  Camiones: ['Chevrolet', 'Hino', 'Foton', 'JAC', 'Isuzu', 'Volvo', 'Kenworth', 'International'],
  'Otros Vehículos': ['Chevrolet', 'Renault', 'Suzuki', 'Piaggio', 'Ayco'],
  'Maquinaria Pesada': ['Caterpillar', 'John Deere', 'JCB', 'Komatsu', 'Case', 'Bobcat'],
  'Carros de Colección': ['Chevrolet', 'Ford', 'Renault', 'Volkswagen', 'Mercedes-Benz', 'Willys'],
  Náutica: ['Yamaha', 'Mercury', 'Suzuki Marine', 'Bayliner', 'Eduardoño'],
};

export function brandsForVehicleType(vehicleType: string): readonly string[] {
  const brands = BRANDS_BY_TYPE[vehicleType as VehicleType] ?? [];
  return [...brands, OTHER_BRAND];
}
