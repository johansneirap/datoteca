import { describe, expect, it } from 'vitest';
import { Datoteca } from '../src/index.js';
import { GOLDEN_SEEDS, runGoldenSequence } from './golden-sequence.js';
import golden from './fixtures/golden.json';

/**
 * Protege la garantía central de la librería: misma seed → mismos datos, siempre.
 * Ver docs/determinism.md para qué hacer si este test falla intencionalmente
 * (ej. refactor del PRNG o de un dataset interno).
 */
describe('golden dataset (determinismo)', () => {
  for (const seed of GOLDEN_SEEDS) {
    it(`seed=${seed}: la secuencia documentada coincide con el fixture golden`, () => {
      const dl = new Datoteca({ seed });
      const actual = runGoldenSequence(dl);
      const expected = golden.seeds[String(seed) as keyof typeof golden.seeds] as
        typeof actual | undefined;

      expect(
        expected,
        `No hay fixture golden para seed=${seed}. Corré "pnpm --filter @datoteca/cl run golden:generate".`,
      ).toBeDefined();

      actual.forEach((entry, index) => {
        const expectedEntry = expected?.[index];
        expect(
          entry.value,
          `[golden] seed=${seed}, llamada #${index} (${entry.call}): esperado ${JSON.stringify(
            expectedEntry?.value,
          )}, obtenido ${JSON.stringify(entry.value)}. Si el cambio es intencional (ej. cambio de PRNG ` +
            'o de un dataset interno), corré "pnpm --filter @datoteca/cl run golden:generate", revisá el ' +
            'diff y bumpeá major version con un changeset (ver docs/determinism.md).',
        ).toEqual(expectedEntry?.value);
      });
    });
  }
});
