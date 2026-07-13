import type { Rng } from '@datoteca/core';
import { APELLIDOS, NOMBRES_FEMENINOS, NOMBRES_MASCULINOS } from '../data/nombres.js';
import { generarRut } from '../rut.js';
import type { RutOptions } from '../rut.js';

/**
 * Generador de datos de personas naturales chilenas: RUT, nombres y apellidos.
 *
 * Generator for Chilean natural-person data: RUT, first names, and last names.
 */
export class PersonaNamespace {
  /**
   * Crea el generador de datos usando un RNG compartido.
   *
   * Creates the data generator using a shared RNG.
   *
   * @param rng - Generador de números aleatorios determinístico compartido. / Shared deterministic random number generator.
   */
  constructor(private readonly rng: Rng) {}

  /**
   * Genera un RUT de persona natural.
   *
   * Generates a natural-person RUT.
   *
   * @param options - Formato de salida y si incluir el dígito verificador. / Output format and whether to include the check digit.
   * @returns El RUT generado como string, en el formato pedido. / The generated RUT as a string, in the requested format.
   */
  rut(options?: RutOptions): string {
    return generarRut(this.rng, options);
  }

  /**
   * Genera un nombre de pila chileno (femenino o masculino).
   *
   * Generates a Chilean first name (female or male).
   *
   * @returns El nombre generado. / The generated first name.
   */
  nombre(): string {
    const nombres = this.rng.pickOne([NOMBRES_FEMENINOS, NOMBRES_MASCULINOS]);
    return this.rng.pickOne(nombres);
  }

  /**
   * Genera un apellido chileno.
   *
   * Generates a Chilean last name.
   *
   * @returns El apellido generado. / The generated last name.
   */
  apellido(): string {
    return this.rng.pickOne(APELLIDOS);
  }

  /**
   * Genera un nombre completo chileno (nombre + apellido paterno + apellido materno).
   * Hace su propio sorteo independiente del RNG, por lo que no comparte valores con
   * llamadas separadas a {@link nombre} o {@link apellido}.
   *
   * Generates a full Chilean name (first name + paternal surname + maternal surname).
   * It draws independently from the RNG, so it does not share values with separate
   * calls to {@link nombre} or {@link apellido}.
   *
   * @returns El nombre completo generado. / The generated full name.
   */
  nombreCompleto(): string {
    const nombres = this.rng.pickOne([NOMBRES_FEMENINOS, NOMBRES_MASCULINOS]);
    const nombre = this.rng.pickOne(nombres);
    const apellidoPaterno = this.rng.pickOne(APELLIDOS);
    const apellidoMaterno = this.rng.pickOne(APELLIDOS);
    return `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
  }
}
