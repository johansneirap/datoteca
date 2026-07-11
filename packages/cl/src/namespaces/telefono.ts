import type { Rng } from '@datoteca/core';

const CODIGOS_AREA_FIJO = ['2', '32', '33', '41', '45', '51', '57', '61', '63', '71'];

function digitos(rng: Rng, cantidad: number): string {
  return rng.arrayOf(cantidad, () => rng.intBetween(0, 9)).join('');
}

export class TelefonoNamespace {
  constructor(private readonly rng: Rng) {}

  movil(): string {
    return `+56 9 ${digitos(this.rng, 4)} ${digitos(this.rng, 4)}`;
  }

  fijo(): string {
    const codigo = this.rng.pickOne(CODIGOS_AREA_FIJO);
    const cantidadDigitos = codigo === '2' ? 8 : 7;
    const numero = digitos(this.rng, cantidadDigitos);
    return `+56 ${codigo} ${numero}`;
  }
}
