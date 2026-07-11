/** Aplica la máscara DD/MM/AAAA mientras se escribe. */
export function maskDrawDateInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

/**
 * Parsea DD/MM/AAAA a ISO (AAAA-MM-DD). Devuelve null si la fecha no es
 * real o no es futura (el sorteo debe programarse hacia adelante).
 */
export function parseDrawDate(display: string): string | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(display.trim());
  if (!match) {
    return null;
  }
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  const isReal =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  if (!isReal) {
    return null;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date <= today) {
    return null;
  }
  return `${match[3]}-${match[2]}-${match[1]}`;
}

/** ISO (AAAA-MM-DD) → DD/MM/AAAA para mostrar. */
export function drawDateToDisplay(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}

/** DD/MM/AAAA → Date (o null si no es una fecha real). Sin exigir que sea futura. */
export function displayToDate(display: string): Date | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(display.trim());
  if (!match) {
    return null;
  }
  const date = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
  const isReal =
    date.getFullYear() === Number(match[3]) &&
    date.getMonth() === Number(match[2]) - 1 &&
    date.getDate() === Number(match[1]);
  return isReal ? date : null;
}

/** Date → DD/MM/AAAA. */
export function dateToDisplay(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
}

/** Año de vehículo plausible. */
export function isValidVehicleYear(value: string): boolean {
  const year = Number(value);
  return /^\d{4}$/.test(value) && year >= 1980 && year <= new Date().getFullYear() + 1;
}
