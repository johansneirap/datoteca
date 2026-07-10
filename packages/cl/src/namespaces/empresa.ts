import type { Rng } from '@datoteca/core';
import { APELLIDOS } from '../data/nombres.js';
import { GIROS, SUFIJOS_EMPRESA, SUSTANTIVOS_EMPRESA } from '../data/empresas.js';

export class EmpresaNamespace {
  constructor(private readonly rng: Rng) {}

  razonSocial(): string {
    const sustantivo = this.rng.pickOne(SUSTANTIVOS_EMPRESA);
    const apellido = this.rng.pickOne(APELLIDOS);
    const sufijo = this.rng.pickOne(SUFIJOS_EMPRESA);
    return `${sustantivo} ${apellido} ${sufijo}`;
  }

  giro(): string {
    return this.rng.pickOne(GIROS);
  }
}
