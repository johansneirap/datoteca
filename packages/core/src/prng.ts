/**
 * Hashea un string a un entero de 32 bits, usado para derivar una seed
 * numérica cuando el usuario pasa un string.
 *
 * Hashes a string into a 32-bit integer, used to derive a numeric seed
 * when the caller passes a string.
 *
 * @param str - Texto a hashear. / Text to hash.
 * @returns Entero sin signo de 32 bits derivado del texto. / Unsigned 32-bit integer derived from the text.
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
 * PRNG determinístico rápido, no criptográfico. Suficiente calidad para
 * datos de prueba: la misma seed siempre produce la misma secuencia.
 *
 * Fast, non-cryptographic deterministic PRNG. Good enough quality for test
 * data: the same seed always produces the same sequence.
 *
 * @param seed - Seed numérica entera (sin signo de 32 bits). / Integer numeric seed (unsigned 32-bit).
 * @returns Función generadora que devuelve un float en `[0, 1)` en cada llamada. / Generator function that returns a float in `[0, 1)` on each call.
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

/**
 * Normaliza una seed de usuario (número o string) a un entero sin signo
 * de 32 bits, hasheando el string con {@link xfnv1a} cuando corresponde.
 *
 * Normalizes a user-provided seed (number or string) into an unsigned
 * 32-bit integer, hashing the string with {@link xfnv1a} when needed.
 *
 * @param seed - Seed original: número o texto. / Original seed: number or text.
 * @returns Entero sin signo de 32 bits listo para {@link mulberry32}. / Unsigned 32-bit integer ready for {@link mulberry32}.
 */
export function normalizeSeed(seed: number | string): number {
  return typeof seed === 'string' ? xfnv1a(seed) : seed >>> 0;
}
