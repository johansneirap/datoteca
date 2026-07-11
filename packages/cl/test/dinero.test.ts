import { describe, expect, it } from 'vitest';
import { Datoteca } from '../src/index.js';

describe('dinero', () => {
  it('clp() retorna un string formateado en es-CL con símbolo $', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.dinero.clp()).toMatch(/^\$[\d.]+$/);
  });

  it('clp() respeta el rango { min, max }', () => {
    const dl = new Datoteca({ seed: 1 });
    for (let i = 0; i < 50; i++) {
      const valor = Number(dl.dinero.clp({ min: 100, max: 200 }).replace(/[^\d]/g, ''));
      expect(valor).toBeGreaterThanOrEqual(100);
      expect(valor).toBeLessThanOrEqual(200);
    }
  });

  it('uf() retorna un string con prefijo "UF " y formato es-CL con decimales', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.dinero.uf()).toMatch(/^UF [\d.]+,\d{2}$/);
  });

  it('determinismo: misma seed y mismo orden produce el mismo resultado', () => {
    const dlA = new Datoteca({ seed: 13 });
    const dlB = new Datoteca({ seed: 13 });
    expect(dlA.dinero.clp()).toBe(dlB.dinero.clp());
    expect(dlA.dinero.uf()).toBe(dlB.dinero.uf());
  });
});
