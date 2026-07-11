import { describe, expect, it } from 'vitest';
import { Datoteca } from '../src/index.js';

describe('telefono', () => {
  it('movil() tiene formato +56 9 XXXX XXXX', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.telefono.movil()).toMatch(/^\+56 9 \d{4} \d{4}$/);
  });

  it('fijo() tiene formato +56 <código> <número>', () => {
    const dl = new Datoteca({ seed: 1 });
    expect(dl.telefono.fijo()).toMatch(/^\+56 \d{1,2} \d{7,8}$/);
  });

  it('determinismo: misma seed y mismo orden produce el mismo resultado', () => {
    const dlA = new Datoteca({ seed: 8 });
    const dlB = new Datoteca({ seed: 8 });
    expect(dlA.telefono.movil()).toBe(dlB.telefono.movil());
    expect(dlA.telefono.fijo()).toBe(dlB.telefono.fijo());
  });
});
