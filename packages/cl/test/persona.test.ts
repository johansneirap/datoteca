import { describe, expect, it } from 'vitest';
import { Datoteca } from '../src/index.js';

describe('persona', () => {
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
  });
});
