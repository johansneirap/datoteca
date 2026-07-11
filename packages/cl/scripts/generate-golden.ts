import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { test } from 'vitest';
import { Datoteca } from '../src/index.js';
import { GOLDEN_SEEDS, runGoldenSequence } from '../test/golden-sequence.js';
import type { GoldenEntry } from '../test/golden-sequence.js';

const FIXTURE_PATH = fileURLToPath(new URL('../test/fixtures/golden.json', import.meta.url));

/**
 * Regenera el fixture golden. Correr SOLO manualmente vía:
 *   pnpm --filter @datoteca/cl run golden:generate
 *
 * Se implementa como un test de Vitest (en vez de un script node/tsx suelto) para
 * reutilizar el transform TS+ESM que el repo ya tiene vía Vitest, sin agregar una
 * dependencia nueva solo para correr este script. Vive fuera de test/**, así que
 * el include de vitest.config.ts nunca lo detecta: no corre en `pnpm test` ni CI.
 *
 * Un fixture regenerado con valores distintos es, por definición, un cambio del
 * contrato de determinismo de la librería — requiere un major bump (ver
 * docs/determinism.md).
 */
test('regenerar fixture golden', () => {
  const seeds: Record<string, GoldenEntry[]> = {};

  for (const seed of GOLDEN_SEEDS) {
    const dl = new Datoteca({ seed });
    seeds[String(seed)] = runGoldenSequence(dl);
  }

  const fixture = { sequenceVersion: 1, seeds };
  writeFileSync(FIXTURE_PATH, `${JSON.stringify(fixture, null, 2)}\n`, 'utf-8');
});
