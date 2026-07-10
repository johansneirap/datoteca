import { createRng } from '@datoteca/core';
import type { Rng } from '@datoteca/core';
import { calcularDV, generarRut } from './rut.js';
import type { RutOptions } from './rut.js';

export interface DatotecaOptions {
  seed: number | string;
}

export class Datoteca {
  private readonly rng: Rng;

  constructor(options: DatotecaOptions) {
    this.rng = createRng(options.seed);
  }

  rut(options?: RutOptions): string {
    return generarRut(this.rng, options);
  }

  static calcularDV(numero: number): string {
    return calcularDV(numero);
  }
}

export type { RutFormat, RutOptions } from './rut.js';
