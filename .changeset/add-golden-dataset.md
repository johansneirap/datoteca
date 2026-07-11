---
"@datoteca/cl": minor
---

Adds a golden dataset (`packages/cl/test/fixtures/golden.json`, generated via `pnpm --filter @datoteca/cl run golden:generate`) that locks down the exact output of a fixed sequence of generator calls for three representative seeds, guarding the "same seed → same data, always" guarantee against silent regressions. See `docs/determinism.md` for details on what a golden dataset change implies for versioning.
