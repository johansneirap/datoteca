import { describe, expect, it } from 'vitest';
import { Datoteca } from '../src/index.js';
import { COMUNAS } from '../src/data/comunas.js';

describe('direccion', () => {
  it('comuna() retorna una comuna del dataset', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(COMUNAS).toContain(dl.direccion.comuna());
  });

  it('calle() retorna un string con tipo de vía y nombre', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.direccion.calle()).toMatch(/^(Calle|Avenida|Pasaje|Camino) .+/);
  });

  it('direccionCompleta() incluye calle, número y comuna', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.direccion.direccionCompleta()).toMatch(/^.+ \d+, .+$/);
  });

  it('determinismo: misma seed y mismo orden produce el mismo resultado', () => {
    const dlA = new Datoteca({ seed: 21 });
    const dlB = new Datoteca({ seed: 21 });
    expect(dlA.direccion.direccionCompleta()).toBe(dlB.direccion.direccionCompleta());
  });
});
