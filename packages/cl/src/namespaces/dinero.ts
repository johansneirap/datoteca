import type { Rng } from '@datoteca/core';

/**
 * Rango opcional para acotar un monto generado.
 *
 * Optional range to bound a generated amount.
 */
export interface RangoOptions {
  /** Monto mínimo del rango (inclusive). / Minimum amount of the range (inclusive). */
  min?: number;
  /** Monto máximo del rango (inclusive). / Maximum amount of the range (inclusive). */
  max?: number;
}

const CLP_MIN_DEFAULT = 1_000;
const CLP_MAX_DEFAULT = 5_000_000;
const UF_MIN_DEFAULT = 1;
const UF_MAX_DEFAULT = 10_000;

const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

const formatoUF = new Intl.NumberFormat('es-CL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Generador de montos de dinero en pesos chilenos (CLP) y Unidad de Fomento (UF).
 *
 * Generator for money amounts in Chilean pesos (CLP) and Unidad de Fomento (UF).
 */
export class DineroNamespace {
  /**
   * Crea el generador de datos usando un RNG compartido.
   *
   * Creates the data generator using a shared RNG.
   *
   * @param rng - Generador de números aleatorios determinístico compartido. / Shared deterministic random number generator.
   */
  constructor(private readonly rng: Rng) {}

  /**
   * Genera un monto en CLP como número (sin formatear).
   *
   * Generates a CLP amount as a number (unformatted).
   *
   * @param options - Rango mínimo/máximo del monto. / Minimum/maximum range of the amount.
   * @returns El monto generado en CLP. / The generated amount in CLP.
   */
  clpNumero(options: RangoOptions = {}): number {
    const { min = CLP_MIN_DEFAULT, max = CLP_MAX_DEFAULT } = options;
    return this.rng.intBetween(min, max);
  }

  /**
   * Genera un monto en CLP formateado como moneda chilena (ej. `$12.345`).
   *
   * Generates a CLP amount formatted as Chilean currency (e.g. `$12.345`).
   *
   * @param options - Rango mínimo/máximo del monto. / Minimum/maximum range of the amount.
   * @returns El monto formateado en CLP. / The formatted amount in CLP.
   */
  clp(options: RangoOptions = {}): string {
    return formatoCLP.format(this.clpNumero(options));
  }

  /**
   * Genera un monto en UF como número (sin formatear), con 2 decimales de precisión.
   *
   * Generates a UF amount as a number (unformatted), with 2 decimal places of precision.
   *
   * @param options - Rango mínimo/máximo del monto. / Minimum/maximum range of the amount.
   * @returns El monto generado en UF. / The generated amount in UF.
   */
  ufNumero(options: RangoOptions = {}): number {
    const { min = UF_MIN_DEFAULT, max = UF_MAX_DEFAULT } = options;
    const centavos = this.rng.intBetween(Math.round(min * 100), Math.round(max * 100));
    return centavos / 100;
  }

  /**
   * Genera un monto en UF formateado (ej. `UF 1.234,56`).
   *
   * Generates a formatted UF amount (e.g. `UF 1.234,56`).
   *
   * @param options - Rango mínimo/máximo del monto. / Minimum/maximum range of the amount.
   * @returns El monto formateado en UF. / The formatted amount in UF.
   */
  uf(options: RangoOptions = {}): string {
    return `UF ${formatoUF.format(this.ufNumero(options))}`;
  }
}
