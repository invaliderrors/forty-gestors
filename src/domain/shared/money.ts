/** Inserta separador de miles: '99990000' → '99.990.000'. */
export function formatThousands(digits: string): string {
  const clean = digits.replace(/\D/g, '');
  if (clean.length === 0) {
    return '';
  }
  return clean.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Formato COP de presentación: 99990000 → '$ 99.990.000'. */
export function formatCop(amount: number): string {
  return `$ ${formatThousands(String(Math.round(amount)))}`;
}
