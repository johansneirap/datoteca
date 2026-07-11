import type { Rng } from '@datoteca/core';

export interface RangoOptions {
  min?: number;
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

export class DineroNamespace {
  constructor(private readonly rng: Rng) {}

  clpNumero(options: RangoOptions = {}): number {
    const { min = CLP_MIN_DEFAULT, max = CLP_MAX_DEFAULT } = options;
    return this.rng.intBetween(min, max);
  }

  clp(options: RangoOptions = {}): string {
    return formatoCLP.format(this.clpNumero(options));
  }

  ufNumero(options: RangoOptions = {}): number {
    const { min = UF_MIN_DEFAULT, max = UF_MAX_DEFAULT } = options;
    const centavos = this.rng.intBetween(Math.round(min * 100), Math.round(max * 100));
    return centavos / 100;
  }

  uf(options: RangoOptions = {}): string {
    return `UF ${formatoUF.format(this.ufNumero(options))}`;
  }
}
