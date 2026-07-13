import type { Rng } from '@datoteca/core';
import { APELLIDOS } from '../data/nombres.js';
import { GIROS, SUFIJOS_EMPRESA, SUSTANTIVOS_EMPRESA } from '../data/empresas.js';
import { generarRutEmpresa } from '../rut.js';
import type { RutOptions } from '../rut.js';

/**
 * Generador de datos de empresas chilenas: RUT, razón social y giro.
 *
 * Generator for Chilean company data: RUT, business name, and industry.
 */
export class EmpresaNamespace {
  /**
   * Crea el generador de datos usando un RNG compartido.
   *
   * Creates the data generator using a shared RNG.
   *
   * @param rng - Generador de números aleatorios determinístico compartido. / Shared deterministic random number generator.
   */
  constructor(private readonly rng: Rng) {}

  /**
   * Genera un RUT de persona jurídica / empresa.
   *
   * Generates a legal-entity/company RUT.
   *
   * @param options - Formato de salida y si incluir el dígito verificador. / Output format and whether to include the check digit.
   * @returns El RUT generado como string, en el formato pedido. / The generated RUT as a string, in the requested format.
   */
  rut(options?: RutOptions): string {
    return generarRutEmpresa(this.rng, options);
  }

  /**
   * Genera una razón social chilena (sustantivo + apellido + sufijo legal).
   *
   * Generates a Chilean business name (noun + surname + legal suffix).
   *
   * @returns La razón social generada. / The generated business name.
   */
  razonSocial(): string {
    const sustantivo = this.rng.pickOne(SUSTANTIVOS_EMPRESA);
    const apellido = this.rng.pickOne(APELLIDOS);
    const sufijo = this.rng.pickOne(SUFIJOS_EMPRESA);
    return `${sustantivo} ${apellido} ${sufijo}`;
  }

  /**
   * Genera el giro (rubro de actividad económica) de una empresa.
   *
   * Generates the industry (economic activity) of a company.
   *
   * @returns El giro generado. / The generated industry.
   */
  giro(): string {
    return this.rng.pickOne(GIROS);
  }
}
