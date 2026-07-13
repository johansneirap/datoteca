import type { Rng } from '@datoteca/core';
import { BANCOS } from '../data/bancos.js';

/**
 * Generador de datos bancarios chilenos: nombre de banco y número de cuenta.
 *
 * Generator for Chilean bank data: bank name and account number.
 */
export class BancoNamespace {
  /**
   * Crea el generador de datos usando un RNG compartido.
   *
   * Creates the data generator using a shared RNG.
   *
   * @param rng - Generador de números aleatorios determinístico compartido. / Shared deterministic random number generator.
   */
  constructor(private readonly rng: Rng) {}

  /**
   * Genera el nombre de un banco que opera en Chile.
   *
   * Generates the name of a bank operating in Chile.
   *
   * @returns El nombre del banco generado. / The generated bank name.
   */
  nombre(): string {
    return this.rng.pickOne(BANCOS);
  }

  /**
   * Genera un número de cuenta bancaria (8 a 12 dígitos).
   *
   * Generates a bank account number (8 to 12 digits).
   *
   * @returns El número de cuenta generado. / The generated account number.
   */
  cuenta(): string {
    const longitud = this.rng.intBetween(8, 12);
    return this.rng.arrayOf(longitud, () => this.rng.intBetween(0, 9)).join('');
  }
}
