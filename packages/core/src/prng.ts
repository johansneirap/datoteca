/**
 * xfnv1a: hashea un string a un entero de 32 bits, usado para derivar
 * una seed numérica cuando el usuario pasa un string.
 */
export function xfnv1a(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * mulberry32: PRNG determinístico rápido, no criptográfico.
 * Suficiente calidad para datos de prueba.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next(): number {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function normalizeSeed(seed: number | string): number {
  return typeof seed === 'string' ? xfnv1a(seed) : seed >>> 0;
}
