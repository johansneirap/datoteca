# @datoteca/cl

## 0.4.0

### Minor Changes

- 5c11ac6: Adds a golden dataset (`packages/cl/test/fixtures/golden.json`, generated via `pnpm --filter @datoteca/cl run golden:generate`) that locks down the exact output of a fixed sequence of generator calls for three representative seeds, guarding the "same seed → same data, always" guarantee against silent regressions. See `docs/determinism.md` for details on what a golden dataset change implies for versioning.

## 0.3.0

### Minor Changes

- 2d313df: Agrega `persona.rut()` y `empresa.rut()` como generadores separados por rango: persona natural (1.000.000-25.000.000) y persona jurídica/empresa (50.000.000-99.999.999, rango que el SII asigna a empresas). `rut()` en la raíz no cambia — sigue generando en el rango de persona natural.

## 0.2.0

### Minor Changes

- b18f8c6: Agrega `dinero.clpNumero()` y `dinero.ufNumero()`, variantes numéricas de `dinero.clp()`/`dinero.uf()` para quien necesite operar los valores (sumar, comparar, etc.) en vez de recibir el string ya formateado.

## 0.1.0

### Minor Changes

- c84ec56: MVP v0.x del generador de datos de prueba para Chile: `Datoteca` con instancia por seed y los namespaces `rut`, `persona`, `direccion`, `telefono`, `dinero`, `banco` y `empresa`.

### Patch Changes

- Updated dependencies [c84ec56]
  - @datoteca/core@0.1.0
