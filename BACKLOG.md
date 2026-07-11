# Backlog

Ideas y mejoras anotadas pero no implementadas todavía, junto con la razón para posponerlas.

## Developer experience

- **CODEOWNERS**: no tiene sentido con un solo colaborador. Agregar cuando haya más de una persona con permisos de review/merge.
- **Bot de stale issues/PRs** (ej. `actions/stale`): prematuro con el volumen de issues actual (cero). Reconsiderar si el backlog de issues empieza a acumular ruido sin actividad.

## Producto (ver también el Roadmap en README.md)

- Otros países/locales (`@datoteca/pe`, `@datoteca/ar`, `@datoteca/es`, ...)
- Seeds reproducibles documentadas públicamente (dataset de ejemplos "golden" para snapshot testing)

## Anotado durante el desarrollo del CLI (fuera de alcance de esa feature)

- **CLI: subcomando `bank`**: el namespace `banco` (`nombre()`, `cuenta()`) no está expuesto en `@datoteca/cli` — el alcance pedido para la v1 del CLI fue explícitamente `rut, person, address, phone, money, company`. Agregar `bank` cuando se pida.
- **CLI: sin API programática**: `@datoteca/cli` solo expone el binario (`bin`, sin `main`/`exports`). Si en algún momento conviene reusar la lógica de parsing/formato de salida (`serializeRows`, `runCli`) como librería importable, habría que agregar un entry point exportado y su build ESM+CJS+d.ts correspondiente — hoy es deliberadamente bin-only.
