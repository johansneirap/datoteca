# @datoteca/core

## 0.1.0

### Minor Changes

- c84ec56: PRNG determinístico (mulberry32) con hash xfnv1a para seeds tipo string. Expone `createRng(seed)` con `random`, `intBetween`, `pickOne`, `pickWeighted` y `arrayOf`.
