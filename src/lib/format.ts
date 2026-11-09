/** Formats rand with a space as thousands separator: 12700 → "R12 700". Locale-independent (SSR = client). */
export const rand = (n: number): string => 'R' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** Afrikaans decimal: 3.14 → "3,1". */
export const decimalAf = (n: number, digits = 1): string => n.toFixed(digits).replace('.', ',');
