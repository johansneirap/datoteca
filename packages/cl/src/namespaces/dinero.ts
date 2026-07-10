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

  clp(options: RangoOptions = {}): string {
    const { min = CLP_MIN_DEFAULT, max = CLP_MAX_DEFAULT } = options;
    const valor = this.rng.intBetween(min, max);
    return formatoCLP.format(valor);
  }

  uf(options: RangoOptions = {}): string {
    const { min = UF_MIN_DEFAULT, max = UF_MAX_DEFAULT } = options;
    const centavos = this.rng.intBetween(Math.round(min * 100), Math.round(max * 100));
    const valor = centavos / 100;
    return `UF ${formatoUF.format(valor)}`;
  }
}
