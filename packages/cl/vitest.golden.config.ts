import { defineConfig } from 'vitest/config';

// Config separada, solo para ejecutar scripts/generate-golden.ts manualmente.
// scripts/ no está en el include de vitest.config.ts, así que este script nunca
// corre como parte de `pnpm test` / CI — solo vía `pnpm golden:generate`.
export default defineConfig({
  test: {
    include: ['scripts/generate-golden.ts'],
  },
});
