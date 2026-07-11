import type { Rng } from '@datoteca/core';
import { BANCOS } from '../data/bancos.js';

export class BancoNamespace {
  constructor(private readonly rng: Rng) {}

  nombre(): string {
    return this.rng.pickOne(BANCOS);
  }

  cuenta(): string {
    const longitud = this.rng.intBetween(8, 12);
    return this.rng.arrayOf(longitud, () => this.rng.intBetween(0, 9)).join('');
  }
}
