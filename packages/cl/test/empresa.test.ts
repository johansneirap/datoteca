import { describe, expect, it } from 'vitest';
import { Datoteca } from '../src/index.js';
import { GIROS } from '../src/data/empresas.js';

describe('empresa', () => {
  it('rut() retorna un RUT válido en el rango de persona jurídica', () => {
    const dl = new Datoteca({ seed: 1 });
    for (let i = 0; i < 100; i++) {
      const rut = dl.empresa.rut({ format: 'raw' });
      const cuerpo = Number(rut.slice(0, -1));
      const dv = rut.slice(-1);
      expect(cuerpo).toBeGreaterThanOrEqual(50_000_000);
      expect(cuerpo).toBeLessThanOrEqual(99_999_999);
      expect(Datoteca.calcularDV(cuerpo)).toBe(dv);
    }
  });

  it('rut() respeta las opciones de formato, igual que rut() en la raíz', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.empresa.rut({ format: 'dots' })).toMatch(/^\d{2}\.\d{3}\.\d{3}-[0-9K]$/);
    expect(dl.empresa.rut({ dv: false })).toMatch(/^\d{8}$/);
  });

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
    expect(dlA.empresa.rut()).toBe(dlB.empresa.rut());
  });
});
