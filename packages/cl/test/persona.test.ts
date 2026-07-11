import { describe, expect, it } from 'vitest';
import { Datoteca } from '../src/index.js';

describe('persona', () => {
  it('rut() retorna un RUT válido en el rango de persona natural', () => {
    const dl = new Datoteca({ seed: 1 });
    for (let i = 0; i < 100; i++) {
      const rut = dl.persona.rut({ format: 'raw' });
      const cuerpo = Number(rut.slice(0, -1));
      const dv = rut.slice(-1);
      expect(cuerpo).toBeGreaterThanOrEqual(1_000_000);
      expect(cuerpo).toBeLessThanOrEqual(25_000_000);
      expect(Datoteca.calcularDV(cuerpo)).toBe(dv);
    }
  });

  it('rut() respeta las opciones de formato, igual que rut() en la raíz', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.persona.rut({ format: 'dots' })).toMatch(/^\d{1,2}\.\d{3}\.\d{3}-[0-9K]$/);
    expect(dl.persona.rut({ dv: false })).toMatch(/^\d{7,8}$/);
  });

  it('nombre() retorna un string no vacío', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.persona.nombre().length).toBeGreaterThan(0);
  });

  it('apellido() retorna un string no vacío', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.persona.apellido().length).toBeGreaterThan(0);
  });

  it('nombreCompleto() retorna nombre + dos apellidos', () => {
    const dl = new Datoteca({ seed: 1 });
    const partes = dl.persona.nombreCompleto().split(' ');
    expect(partes.length).toBeGreaterThanOrEqual(3);
  });

  it('determinismo: misma seed y mismo orden produce el mismo resultado', () => {
    const dlA = new Datoteca({ seed: 55 });
    const dlB = new Datoteca({ seed: 55 });
    expect(dlA.persona.nombreCompleto()).toBe(dlB.persona.nombreCompleto());
    expect(dlA.persona.nombre()).toBe(dlB.persona.nombre());
    expect(dlA.persona.apellido()).toBe(dlB.persona.apellido());
    expect(dlA.persona.rut()).toBe(dlB.persona.rut());
  });
});
