import type { Rng } from '@datoteca/core';

const CODIGOS_AREA_FIJO = ['2', '32', '33', '41', '45', '51', '57', '61', '63', '71'];

function digitos(rng: Rng, cantidad: number): string {
  return rng.arrayOf(cantidad, () => rng.intBetween(0, 9)).join('');
}

/**
 * Generador de números de teléfono chilenos: móviles y fijos.
 *
 * Generator for Chilean phone numbers: mobile and landline.
 */
export class TelefonoNamespace {
  /**
   * Crea el generador de datos usando un RNG compartido.
   *
   * Creates the data generator using a shared RNG.
   *
   * @param rng - Generador de números aleatorios determinístico compartido. / Shared deterministic random number generator.
   */
  constructor(private readonly rng: Rng) {}

  /**
   * Genera un número de celular chileno (`+56 9 XXXX XXXX`).
   *
   * Generates a Chilean mobile phone number (`+56 9 XXXX XXXX`).
   *
   * @returns El número de celular generado. / The generated mobile phone number.
   */
  movil(): string {
    return `+56 9 ${digitos(this.rng, 4)} ${digitos(this.rng, 4)}`;
  }

  /**
   * Genera un número de teléfono fijo chileno con código de área válido.
   *
   * Generates a Chilean landline phone number with a valid area code.
   *
   * @returns El número de teléfono fijo generado. / The generated landline phone number.
   */
  fijo(): string {
    const codigo = this.rng.pickOne(CODIGOS_AREA_FIJO);
    const cantidadDigitos = codigo === '2' ? 8 : 7;
    const numero = digitos(this.rng, cantidadDigitos);
    return `+56 ${codigo} ${numero}`;
  }
}
