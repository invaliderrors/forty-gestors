/**
 * Motor de cálculo normativo de la rifa (fase de onboarding del PDF).
 *
 * ⚠️ Los porcentajes son VALORES DE REFERENCIA tomados del documento de
 * especificación (ej: emisión ~$99M → premio mínimo ~$39-40M, derechos de
 * explotación 14% "o lo que considere Coljuegos"). Antes de producción
 * deben confirmarse contra la norma vigente y volverse configuración
 * remota (motor de reglas versionado), no constantes de la app.
 */
export const NORMATIVE_PARAMS = {
  /** El plan de premios no puede valer menos que este % de la emisión. */
  prizeMinimumRatio: 0.4,
  /** Derechos de explotación que se transfieren al Operador para Coljuegos. */
  explotacionRightsRatio: 0.14,
  /** Costo comercial aproximado de la póliza de cumplimiento (% del premio). */
  insuranceCostRatio: 0.025,
} as const;

/** Aseguradoras aliadas para la póliza de cumplimiento (mock de la alianza real). */
export const AVAILABLE_INSURERS = ['Seguros Bolívar', 'Allianz', 'Sura', 'Seguros Mundial'] as const;

export type RifaProjection = {
  ticketCount: number;
  ticketPrice: number;
  /** cantidad × valor unitario. */
  emissionTotal: number;
  /** Valor mínimo legal del premio. */
  prizeMinimum: number;
  /** Derechos de explotación (van a la salud vía Coljuegos). */
  explotacionRights: number;
  /** Costo aproximado de la póliza de cumplimiento. */
  insuranceCost: number;
  /** Emisión − premio mínimo − derechos − póliza. */
  estimatedEarnings: number;
  /** Lo que el gestor aporta a la salud de los colombianos (= derechos). */
  healthContribution: number;
};

export function computeRifaProjection(ticketCount: number, ticketPrice: number): RifaProjection {
  const emissionTotal = ticketCount * ticketPrice;
  const prizeMinimum = Math.round(emissionTotal * NORMATIVE_PARAMS.prizeMinimumRatio);
  const explotacionRights = Math.round(emissionTotal * NORMATIVE_PARAMS.explotacionRightsRatio);
  const insuranceCost = Math.round(prizeMinimum * NORMATIVE_PARAMS.insuranceCostRatio);
  const estimatedEarnings = Math.max(
    0,
    emissionTotal - prizeMinimum - explotacionRights - insuranceCost,
  );

  return {
    ticketCount,
    ticketPrice,
    emissionTotal,
    prizeMinimum,
    explotacionRights,
    insuranceCost,
    estimatedEarnings,
    healthContribution: explotacionRights,
  };
}
