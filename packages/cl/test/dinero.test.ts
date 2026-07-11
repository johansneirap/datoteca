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

  it('clpNumero() retorna un number dentro del rango, sin formatear', () => {
    const dl = new Datoteca({ seed: 1 });
    for (let i = 0; i < 50; i++) {
      const valor = dl.dinero.clpNumero({ min: 100, max: 200 });
      expect(typeof valor).toBe('number');
      expect(Number.isInteger(valor)).toBe(true);
      expect(valor).toBeGreaterThanOrEqual(100);
      expect(valor).toBeLessThanOrEqual(200);
    }
  });

  it('ufNumero() retorna un number dentro del rango, sin formatear', () => {
    const dl = new Datoteca({ seed: 1 });
    for (let i = 0; i < 50; i++) {
      const valor = dl.dinero.ufNumero({ min: 1, max: 10 });
      expect(typeof valor).toBe('number');
      expect(valor).toBeGreaterThanOrEqual(1);
      expect(valor).toBeLessThanOrEqual(10);
    }
  });

  it('clp() formatea exactamente el mismo valor que clpNumero() en la misma posición de seed', () => {
    const dlNumero = new Datoteca({ seed: 77 });
    const dlString = new Datoteca({ seed: 77 });
    const numero = dlNumero.dinero.clpNumero();
    const string = dlString.dinero.clp();
    expect(string).toBe(
      new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
      }).format(numero),
    );
  });

  it('determinismo: misma seed y mismo orden produce el mismo resultado', () => {
    const dlA = new Datoteca({ seed: 13 });
    const dlB = new Datoteca({ seed: 13 });
    expect(dlA.dinero.clp()).toBe(dlB.dinero.clp());
    expect(dlA.dinero.uf()).toBe(dlB.dinero.uf());
    expect(dlA.dinero.clpNumero()).toBe(dlB.dinero.clpNumero());
    expect(dlA.dinero.ufNumero()).toBe(dlB.dinero.ufNumero());
  });
});
