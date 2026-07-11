# Backlog

Ideas y mejoras anotadas pero no implementadas todavía, junto con la razón para posponerlas.

## Developer experience

- **CODEOWNERS**: no tiene sentido con un solo colaborador. Agregar cuando haya más de una persona con permisos de review/merge.
- **Bot de stale issues/PRs** (ej. `actions/stale`): prematuro con el volumen de issues actual (cero). Reconsiderar si el backlog de issues empieza a acumular ruido sin actividad.

## Producto (ver también el Roadmap en README.md)

- Otros países/locales (`@datoteca/pe`, `@datoteca/ar`, `@datoteca/es`, ...)

## Anotado durante el desarrollo del CLI (fuera de alcance de esa feature)

- **CLI: subcomando `bank`**: el namespace `banco` (`nombre()`, `cuenta()`) no está expuesto en `@datoteca/cli` — el alcance pedido para la v1 del CLI fue explícitamente `rut, person, address, phone, money, company`. Agregar `bank` cuando se pida.
- **CLI: sin API programática**: `@datoteca/cli` solo expone el binario (`bin`, sin `main`/`exports`). Si en algún momento conviene reusar la lógica de parsing/formato de salida (`serializeRows`, `runCli`) como librería importable, habría que agregar un entry point exportado y su build ESM+CJS+d.ts correspondiente — hoy es deliberadamente bin-only.

## Anotado durante el desarrollo del golden dataset (fuera de alcance de esa feature)

- **`persona.nombreCompleto()` y `direccion.direccionCompleta()` no se componen de los otros métodos ya generados**: cada método hace su propio draw independiente del RNG compartido (ej. `nombre()` y el nombre dentro de `nombreCompleto()` casi nunca coinciden). Es el comportamiento actual documentado, pero vale evaluar si conviene una variante que sí componga esos valores — cambiar esto rompería el golden dataset (`packages/cl/test/fixtures/golden.json`) y requeriría un major bump.
- **Dataset de comunas sin validar contra la fuente oficial**: `packages/cl/src/data/comunas.ts` trae una nota interna pendiente desde el scaffold inicial: el dataset fue generado a partir de conocimiento entrenado, no descargado en vivo desde SUBDERE. Validar contra la fuente oficial antes de garantizar exactitud 100% — relevante para el principio de "datos culturalmente correctos" del proyecto.
