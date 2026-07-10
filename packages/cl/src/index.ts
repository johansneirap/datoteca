import { createRng } from '@datoteca/core';
import type { Rng } from '@datoteca/core';
import { calcularDV, generarRut } from './rut.js';
import type { RutOptions } from './rut.js';
import { PersonaNamespace } from './namespaces/persona.js';
import { DireccionNamespace } from './namespaces/direccion.js';
import { TelefonoNamespace } from './namespaces/telefono.js';

export interface DatotecaOptions {
  seed: number | string;
}

export class Datoteca {
  private readonly rng: Rng;

  readonly persona: PersonaNamespace;
  readonly direccion: DireccionNamespace;
  readonly telefono: TelefonoNamespace;

  constructor(options: DatotecaOptions) {
    this.rng = createRng(options.seed);
    this.persona = new PersonaNamespace(this.rng);
    this.direccion = new DireccionNamespace(this.rng);
    this.telefono = new TelefonoNamespace(this.rng);
  }

  rut(options?: RutOptions): string {
    return generarRut(this.rng, options);
  }

  static calcularDV(numero: number): string {
    return calcularDV(numero);
  }
}

export type { RutFormat, RutOptions } from './rut.js';
