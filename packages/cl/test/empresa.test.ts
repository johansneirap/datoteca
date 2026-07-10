import { describe, expect, it } from 'vitest';
import { Datoteca } from '../src/index.js';
import { GIROS } from '../src/data/empresas.js';

describe('empresa', () => {
  it('razonSocial() retorna un string no vacío', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.empresa.razonSocial().length).toBeGreaterThan(0);
  });

  it('giro() retorna un giro del dataset', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(GIROS).toContain(dl.empresa.giro());
  });

  it('determinismo: misma seed y mismo orden produce el mismo resultado', () => {
    const dlA = new Datoteca({ seed: 3 });
    const dlB = new Datoteca({ seed: 3 });
    expect(dlA.empresa.razonSocial()).toBe(dlB.empresa.razonSocial());
    expect(dlA.empresa.giro()).toBe(dlB.empresa.giro());
  });
});
