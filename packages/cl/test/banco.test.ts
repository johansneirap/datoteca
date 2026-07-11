import { describe, expect, it } from 'vitest';
import { Datoteca } from '../src/index.js';
import { BANCOS } from '../src/data/bancos.js';

describe('banco', () => {
  it('nombre() retorna un banco del dataset', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(BANCOS).toContain(dl.banco.nombre());
  });

  it('cuenta() retorna solo dígitos', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.banco.cuenta()).toMatch(/^\d{8,12}$/);
  });

  it('determinismo: misma seed y mismo orden produce el mismo resultado', () => {
    const dlA = new Datoteca({ seed: 17 });
    const dlB = new Datoteca({ seed: 17 });
    expect(dlA.banco.nombre()).toBe(dlB.banco.nombre());
    expect(dlA.banco.cuenta()).toBe(dlB.banco.cuenta());
  });
});
