import { mulberry32, normalizeSeed } from './prng.js';

/**
 * Generador de números aleatorios determinístico. Todas sus operaciones
 * derivan del mismo estado interno, por lo que la misma secuencia de
 * llamadas sobre una instancia con la misma seed siempre produce el mismo
 * resultado.
 *
 * Deterministic random number generator. All of its operations derive
 * from the same internal state, so the same sequence of calls on an
 * instance with the same seed always produces the same result.
 */
export interface Rng {
  /** Float en [0, 1) / Float in [0, 1) */
  random(): number;
  /** Entero en [min, max] inclusive / Integer in [min, max] inclusive */
  intBetween(min: number, max: number): number;
  /** Elige un elemento al azar del array (uniforme) / Picks a random element from the array (uniform) */
  pickOne<T>(items: readonly T[]): T;
  /** Elige un elemento al azar según pesos relativos / Picks a random element according to relative weights */
  pickWeighted<T>(items: readonly { value: T; weight: number }[]): T;
  /** Genera un array de `count` elementos usando `factory` / Generates an array of `count` elements using `factory` */
  arrayOf<T>(count: number, factory: (index: number) => T): T[];
}

/**
 * Crea un {@link Rng} determinístico a partir de una seed.
 *
 * Creates a deterministic {@link Rng} from a seed.
 *
 * @param seed - Seed numérica o string (los strings se hashean internamente). / Numeric or string seed (strings are hashed internally).
 * @returns Instancia de {@link Rng} lista para usar. / Ready-to-use {@link Rng} instance.
 */
export function createRng(seed: number | string): Rng {
  const next = mulberry32(normalizeSeed(seed));

  const random = (): number => next();

  const intBetween = (min: number, max: number): number => {
    if (max < min) {
      throw new RangeError(`intBetween: max (${max}) debe ser >= min (${min})`);
    }
    return Math.floor(random() * (max - min + 1)) + min;
  };

  const pickOne = <T>(items: readonly T[]): T => {
    if (items.length === 0) {
      throw new RangeError('pickOne: el array no puede estar vacío');
    }
    const index = Math.floor(random() * items.length);
    return items[Math.min(index, items.length - 1)] as T;
  };

  const pickWeighted = <T>(items: readonly { value: T; weight: number }[]): T => {
    if (items.length === 0) {
      throw new RangeError('pickWeighted: el array no puede estar vacío');
    }
    const total = items.reduce((sum, item) => sum + item.weight, 0);
    let threshold = random() * total;
    for (const item of items) {
      threshold -= item.weight;
      if (threshold <= 0) {
        return item.value;
      }
    }
    return items[items.length - 1]!.value;
  };

  const arrayOf = <T>(count: number, factory: (index: number) => T): T[] => {
    return Array.from({ length: count }, (_, index) => factory(index));
  };

  return { random, intBetween, pickOne, pickWeighted, arrayOf };
}
