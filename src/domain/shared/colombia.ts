import { COLOMBIA_DIVIPOLA } from '@/domain/shared/colombiaDivipola';

/**
 * Facade de la división político-administrativa (DIVIPOLA, DANE) para la
 * dirección de notificación: departamentos y municipios dependientes.
 */
export const DEPARTMENTS: readonly string[] = COLOMBIA_DIVIPOLA.map(
  (department) => department.name,
);

export function municipalitiesOf(departmentName: string | null): readonly string[] {
  if (!departmentName) {
    return [];
  }
  const department = COLOMBIA_DIVIPOLA.find((entry) => entry.name === departmentName);
  return department ? department.municipalities.map((municipality) => municipality.name) : [];
}
