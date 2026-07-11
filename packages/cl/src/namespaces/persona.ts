import type { Rng } from '@datoteca/core';
import { APELLIDOS, NOMBRES_FEMENINOS, NOMBRES_MASCULINOS } from '../data/nombres.js';
import { generarRut } from '../rut.js';
import type { RutOptions } from '../rut.js';

export class PersonaNamespace {
  constructor(private readonly rng: Rng) {}

  rut(options?: RutOptions): string {
    return generarRut(this.rng, options);
  }

  nombre(): string {
    const nombres = this.rng.pickOne([NOMBRES_FEMENINOS, NOMBRES_MASCULINOS]);
    return this.rng.pickOne(nombres);
  }

  apellido(): string {
    return this.rng.pickOne(APELLIDOS);
  }

  nombreCompleto(): string {
    const nombres = this.rng.pickOne([NOMBRES_FEMENINOS, NOMBRES_MASCULINOS]);
    const nombre = this.rng.pickOne(nombres);
    const apellidoPaterno = this.rng.pickOne(APELLIDOS);
    const apellidoMaterno = this.rng.pickOne(APELLIDOS);
    return `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
  }
}
