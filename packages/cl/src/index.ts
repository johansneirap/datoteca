import { createRng } from '@datoteca/core';
import type { Rng } from '@datoteca/core';
import { calcularDV, generarRut } from './rut.js';
import type { RutOptions } from './rut.js';
import { PersonaNamespace } from './namespaces/persona.js';
import { DireccionNamespace } from './namespaces/direccion.js';
import { TelefonoNamespace } from './namespaces/telefono.js';
import { DineroNamespace } from './namespaces/dinero.js';
import { BancoNamespace } from './namespaces/banco.js';
import { EmpresaNamespace } from './namespaces/empresa.js';

/**
 * Opciones de inicialización de {@link Datoteca}.
 *
 * Initialization options for {@link Datoteca}.
 */
export interface DatotecaOptions {
  /** Seed determinística: la misma seed siempre produce el mismo resultado. / Deterministic seed: the same seed always produces the same result. */
  seed: number | string;
}

/**
 * Generador principal de datos de prueba para Chile. Instancia con una seed:
 * la misma seed, en el mismo orden de llamadas, siempre produce el mismo resultado.
 *
 * Main test data generator for Chile. Instantiate with a seed: the same seed,
 * called in the same order, always produces the same result.
 */
export class Datoteca {
  private readonly rng: Rng;

  /** Generador de datos de personas naturales. / Natural-person data generator. */
  readonly persona: PersonaNamespace;
  /** Generador de datos de direcciones. / Address data generator. */
  readonly direccion: DireccionNamespace;
  /** Generador de datos de teléfonos. / Phone number data generator. */
  readonly telefono: TelefonoNamespace;
  /** Generador de montos de dinero (CLP/UF). / Money amount data generator (CLP/UF). */
  readonly dinero: DineroNamespace;
  /** Generador de datos bancarios. / Bank data generator. */
  readonly banco: BancoNamespace;
  /** Generador de datos de empresas. / Company data generator. */
  readonly empresa: EmpresaNamespace;

  /**
   * Crea una nueva instancia de {@link Datoteca}.
   *
   * Creates a new {@link Datoteca} instance.
   *
   * @param options - Opciones de inicialización, incluida la seed. / Initialization options, including the seed.
   */
  constructor(options: DatotecaOptions) {
    this.rng = createRng(options.seed);
    this.persona = new PersonaNamespace(this.rng);
    this.direccion = new DireccionNamespace(this.rng);
    this.telefono = new TelefonoNamespace(this.rng);
    this.dinero = new DineroNamespace(this.rng);
    this.banco = new BancoNamespace(this.rng);
    this.empresa = new EmpresaNamespace(this.rng);
  }

  /**
   * Genera un RUT chileno válido con dígito verificador módulo 11.
   *
   * Generates a valid Chilean RUT (national tax ID) with a modulo-11 check digit.
   *
   * @param options - Formato de salida y si incluir el dígito verificador. / Output format and whether to include the check digit.
   * @returns El RUT generado como string, en el formato pedido. / The generated RUT as a string, in the requested format.
   */
  rut(options?: RutOptions): string {
    return generarRut(this.rng, options);
  }

  /**
   * Calcula el dígito verificador de un RUT chileno con el algoritmo módulo 11 estándar.
   *
   * Computes the check digit of a Chilean RUT using the standard modulo-11 algorithm.
   *
   * @param numero - Número base del RUT (sin dígito verificador). / Base RUT number (without check digit).
   * @returns El dígito verificador: `'0'`-`'9'` o `'K'`. / The check digit: `'0'`-`'9'` or `'K'`.
   */
  static calcularDV(numero: number): string {
    return calcularDV(numero);
  }
}

export type { RutFormat, RutOptions } from './rut.js';
