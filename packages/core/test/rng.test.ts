import { describe, expect, it } from 'vitest';
import { createRng } from '../src/index.js';

describe('createRng', () => {
  it('produce la misma secuencia con la misma seed numérica', () => {
    const rngA = createRng(123);
    const rngB = createRng(123);
    const seqA = rngA.arrayOf(10, () => rngA.random());
    const seqB = rngB.arrayOf(10, () => rngB.random());
    expect(seqA).toEqual(seqB);
  });

  it('produce la misma secuencia con la misma seed string', () => {
    const rngA = createRng('mi-seed');
    const rngB = createRng('mi-seed');
    expect(rngA.intBetween(1, 1000)).toBe(rngB.intBetween(1, 1000));
  });

  it('produce secuencias distintas con seeds distintas', () => {
    const rngA = createRng(1);
    const rngB = createRng(2);
    expect(rngA.random()).not.toBe(rngB.random());
  });

  it('random() retorna valores en [0, 1)', () => {
    const rng = createRng(42);
    for (let i = 0; i < 1000; i++) {
      const value = rng.random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it('intBetween respeta los límites inclusive', () => {
    const rng = createRng(7);
    for (let i = 0; i < 500; i++) {
      const value = rng.intBetween(5, 5);
      expect(value).toBe(5);
    }
    const rng2 = createRng(7);
    for (let i = 0; i < 500; i++) {
      const value = rng2.intBetween(1, 3);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(3);
    }
  });

  it('pickOne siempre retorna un elemento del array', () => {
    const rng = createRng(9);
    const items = ['a', 'b', 'c'];
    for (let i = 0; i < 100; i++) {
      expect(items).toContain(rng.pickOne(items));
    }
  });

  it('pickOne lanza error con array vacío', () => {
    const rng = createRng(1);
    expect(() => rng.pickOne([])).toThrow();
  });

  it('pickWeighted favorece el peso más alto en agregado', () => {
    const rng = createRng(2024);
    const counts = { a: 0, b: 0 };
    for (let i = 0; i < 1000; i++) {
      const value = rng.pickWeighted([
        { value: 'a', weight: 9 },
        { value: 'b', weight: 1 },
      ]);
      counts[value as 'a' | 'b']++;
    }
    expect(counts.a).toBeGreaterThan(counts.b);
  });

  it('arrayOf genera la cantidad de elementos solicitada', () => {
    const rng = createRng(3);
    const arr = rng.arrayOf(5, (i) => i * 2);
    expect(arr).toEqual([0, 2, 4, 6, 8]);
  });
});
