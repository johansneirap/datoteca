import type { Rng } from '@datoteca/core';
import { NOMBRES_CALLE, TIPOS_VIA } from '../data/calles.js';
import { COMUNAS } from '../data/comunas.js';

/**
 * Generador de datos de direcciones chilenas: comuna, calle y dirección completa.
 *
 * Generator for Chilean address data: commune, street, and full address.
 */
export class DireccionNamespace {
  /**
   * Crea el generador de datos usando un RNG compartido.
   *
   * Creates the data generator using a shared RNG.
   *
   * @param rng - Generador de números aleatorios determinístico compartido. / Shared deterministic random number generator.
   */
  constructor(private readonly rng: Rng) {}

  /**
   * Genera el nombre de una comuna chilena.
   *
   * Generates the name of a Chilean commune.
   *
   * @returns La comuna generada. / The generated commune.
   */
  comuna(): string {
    return this.rng.pickOne(COMUNAS);
  }

  /**
   * Genera el nombre de una calle chilena (tipo de vía + nombre).
   *
   * Generates a Chilean street name (street type + name).
   *
   * @returns La calle generada. / The generated street.
   */
  calle(): string {
    const tipo = this.rng.pickOne(TIPOS_VIA);
    const nombre = this.rng.pickOne(NOMBRES_CALLE);
    return `${tipo} ${nombre}`;
  }

  /**
   * Genera una dirección chilena completa (calle, número y comuna). Hace su
   * propio sorteo independiente del RNG, por lo que no comparte valores con
   * llamadas separadas a {@link calle} o {@link comuna}.
   *
   * Generates a full Chilean address (street, number, and commune). It draws
   * independently from the RNG, so it does not share values with separate
   * calls to {@link calle} or {@link comuna}.
   *
   * @returns La dirección completa generada. / The generated full address.
   */
  direccionCompleta(): string {
    const calle = this.calle();
    const numero = this.rng.intBetween(1, 9999);
    const comuna = this.comuna();
    return `${calle} ${numero}, ${comuna}`;
  }
}
