# Determinismo y el golden dataset

## La garantía

`@datoteca/cl` garantiza: **misma seed + mismo orden de llamadas → mismos datos, siempre.**

```ts
const a = new Datoteca({ seed: 42 });
const b = new Datoteca({ seed: 42 });

a.persona.nombre() === b.persona.nombre(); // true, siempre
```

Esto es lo que permite usar Datoteca en tests propios con una seed fija: si guardaste un
RUT, un monto o una dirección generados con `seed: 42`, ese valor no debería cambiar entre
versiones parche/menor de la librería.

## Por qué el orden de las llamadas importa

Todos los namespaces (`persona`, `direccion`, `telefono`, `dinero`, `banco`, `empresa`) y el
método `rut()` comparten **un único generador de números pseudoaleatorios por instancia** de
`Datoteca` (ver `packages/core/src/rng.ts`). Cada llamada a un generador consume el siguiente
número del mismo stream. Esto significa que:

- Agregar, quitar o reordenar una llamada en medio de una secuencia desplaza el stream y
  cambia **todos los valores generados después de ese punto**, aunque la seed no cambie.
- Dos secuencias de llamadas distintas sobre la misma seed no son comparables entre sí.

Si construís tests propios sobre una seed fija, el orden exacto de tus llamadas a los
generadores forma parte del contrato — no solo la seed.

## El golden dataset

Para detectar regresiones silenciosas en esa garantía (por ejemplo, un refactor del PRNG en
`@datoteca/core`, o un cambio accidental en el orden interno de un dataset como `comunas.ts`
o `nombres.ts`), `@datoteca/cl` fija tres seeds representativas (`1`, `42`, `12345`) y, para
cada una, una secuencia exacta y documentada de llamadas a los generadores.

- **`packages/cl/test/golden-sequence.ts`** — la secuencia de llamadas en sí (única fuente de
  verdad; tanto el test como el script de regeneración la importan desde acá).
- **`packages/cl/test/fixtures/golden.json`** — el output esperado, checkeado a mano en el
  repo (no un snapshot autogenerado de Vitest, para que no se pueda pisar por accidente con
  `--update`).
- **`packages/cl/test/golden.test.ts`** — corre la secuencia contra cada seed y compara
  valor por valor contra el fixture. Si algo no coincide, el mensaje de falla indica la seed,
  el número de llamada y el nombre de la llamada que rompió — no un "snapshot mismatch"
  genérico.

Este test corre como parte de la suite normal (`pnpm test` en `packages/cl`, y por lo tanto
en CI vía `pnpm -r test`).

## Qué hacer si el test golden falla

**Si falló sin que lo esperaras:** es una regresión. Alguien cambió el PRNG, un dataset
interno, o el orden de llamadas dentro de un generador, sin darse cuenta de que eso rompe
reproducibilidad para cualquiera que dependa de una seed fija. Hay que arreglar la causa, no
el fixture.

**Si el cambio de output es intencional** (ej. un refactor del PRNG, o agregar/reordenar
entradas en un dataset a propósito):

1. Corré `pnpm --filter @datoteca/cl run golden:generate` para regenerar
   `test/fixtures/golden.json`. Este script vive en `packages/cl/scripts/generate-golden.ts`
   y **no** corre como parte de `pnpm test` ni de CI — solo se ejecuta a mano.
2. Revisá el diff del fixture con cuidado: es el registro explícito de qué cambió para cada
   seed.
3. Un fixture golden distinto implica que `@datoteca/cl` cambió su contrato de
   determinismo — esto es un **breaking change**, sin importar cuán pequeño parezca el cambio
   de código que lo causó. Se declara con un changeset de tipo `major` y se documenta en el
   CHANGELOG del paquete.
