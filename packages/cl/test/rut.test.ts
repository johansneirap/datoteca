import { describe, expect, it } from 'vitest';
import { Datoteca } from '../src/index.js';

describe('rut', () => {
  it('formato dash por defecto: NNNNNNNN-D', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.rut()).toMatch(/^\d{7,8}-[0-9K]$/);
  });

  it('formato dots: NN.NNN.NNN-D', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.rut({ format: 'dots' })).toMatch(/^\d{1,2}\.\d{3}\.\d{3}-[0-9K]$/);
  });

  it('formato raw: sin puntos ni guion', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.rut({ format: 'raw' })).toMatch(/^\d{7,9}[0-9K]$/);
  });

  it('dv: false omite el dígito verificador', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.rut({ dv: false })).toMatch(/^\d{7,8}$/);
    expect(dl.rut({ format: 'dots', dv: false })).toMatch(/^\d{1,2}\.\d{3}\.\d{3}$/);
  });

  it('el DV generado siempre es válido según módulo 11', () => {
    const dl = new Datoteca({ seed: 999 });
    for (let i = 0; i < 200; i++) {
      const rut = dl.rut({ format: 'raw' });
      const cuerpo = rut.slice(0, -1);
      const dv = rut.slice(-1);
      expect(Datoteca.calcularDV(Number(cuerpo))).toBe(dv);
    }
  });

  it('misma seed y mismo orden de llamadas produce el mismo resultado', () => {
    const dlA = new Datoteca({ seed: 42 });
    const dlB = new Datoteca({ seed: 42 });
    expect(dlA.rut()).toBe(dlB.rut());
    expect(dlA.rut({ format: 'dots' })).toBe(dlB.rut({ format: 'dots' }));
  });

  it('seeds distintas producen resultados distintos', () => {
    const dlA = new Datoteca({ seed: 1 });
    const dlB = new Datoteca({ seed: 2 });
    expect(dlA.rut()).not.toBe(dlB.rut());
  });
});

describe('Datoteca.calcularDV', () => {
  it('calcula dígitos verificadores conocidos', () => {
    // Casos de referencia calculados con el algoritmo módulo 11 estándar.
    expect(Datoteca.calcularDV(12345678)).toBe('5');
    expect(Datoteca.calcularDV(11111111)).toBe('1');
    expect(Datoteca.calcularDV(1)).toBe('9');
  });

  it('es un método estático que no requiere seed', () => {
    expect(typeof Datoteca.calcularDV).toBe('function');
    expect(Datoteca.calcularDV(7654321)).toMatch(/^[0-9K]$/);
  });
});
