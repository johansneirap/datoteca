import type { Rng } from '@datoteca/core';
import { NOMBRES_CALLE, TIPOS_VIA } from '../data/calles.js';
import { COMUNAS } from '../data/comunas.js';

export class DireccionNamespace {
  constructor(private readonly rng: Rng) {}

  comuna(): string {
    return this.rng.pickOne(COMUNAS);
  }

  calle(): string {
    const tipo = this.rng.pickOne(TIPOS_VIA);
    const nombre = this.rng.pickOne(NOMBRES_CALLE);
    return `${tipo} ${nombre}`;
  }

  direccionCompleta(): string {
    const calle = this.calle();
    const numero = this.rng.intBetween(1, 9999);
    const comuna = this.comuna();
    return `${calle} ${numero}, ${comuna}`;
  }
}
