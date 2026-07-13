# Backlog

Ideas y mejoras anotadas pero no implementadas todavía, junto con la razón para posponerlas.

## Developer experience

- **CODEOWNERS**: no tiene sentido con un solo colaborador. Agregar cuando haya más de una persona con permisos de review/merge.
- **Bot de stale issues/PRs** (ej. `actions/stale`): prematuro con el volumen de issues actual (cero). Reconsiderar si el backlog de issues empieza a acumular ruido sin actividad.
- **Shiki Twoslash / Expressive Code para los ejemplos de código**: los ejemplos del README ya son archivos `.ts` reales type-checados en CI (`examples/`, ver `pnpm typecheck`), pero el render enriquecido tipo Twoslash (hover de tipos, errores inline) en un sitio de docs requiere un framework de sitio (VitePress/Starlight), descartado por ahora — ver el punto de VitePress en "Documentación".

## Producto (ver también el Roadmap en README.md)

- Otros países/locales (`@datoteca/pe`, `@datoteca/ar`, `@datoteca/es`, ...)

## Anotado durante el desarrollo del CLI (fuera de alcance de esa feature)

- **CLI: subcomando `bank`**: el namespace `banco` (`nombre()`, `cuenta()`) no está expuesto en `@datoteca/cli` — el alcance pedido para la v1 del CLI fue explícitamente `rut, person, address, phone, money, company`. Agregar `bank` cuando se pida.
- **CLI: sin API programática**: `@datoteca/cli` solo expone el binario (`bin`, sin `main`/`exports`). Si en algún momento conviene reusar la lógica de parsing/formato de salida (`serializeRows`, `runCli`) como librería importable, habría que agregar un entry point exportado y su build ESM+CJS+d.ts correspondiente — hoy es deliberadamente bin-only.

## Documentación

- **VitePress**: evaluado y descartado por ahora para este proyecto — un monorepo de 3 paquetes chicos como este no justifica todavía un theme/sidebar custom. Ya se usa VitePress + TypeDoc en otro proyecto TS propio; si en algún momento conviene mantener identidad visual consistente entre proyectos OSS, extraer esa configuración a una plantilla reusable en lugar de reimplementarla — pero reconsiderar recién cuando el sitio simple de TypeDoc esté validado (tráfico/uso real) y se necesiten guías editoriales además de referencia de API.
- **Plantilla de documentación reusable entre proyectos OSS propios**: en vez de decidir el stack de docs repo por repo, extraer a un template propio (VitePress + TypeDoc, o el TypeDoc plano de arriba) para que agregar un sitio de docs a un nuevo proyecto sea "copiar configuración", no "decidir e implementar de cero". Consistencia entre proyectos > herramienta óptima por proyecto.

## Anotado durante el desarrollo del golden dataset (fuera de alcance de esa feature)

- **`persona.nombreCompleto()` y `direccion.direccionCompleta()` no se componen de los otros métodos ya generados**: cada método hace su propio draw independiente del RNG compartido (ej. `nombre()` y el nombre dentro de `nombreCompleto()` casi nunca coinciden). Es el comportamiento actual documentado, pero vale evaluar si conviene una variante que sí componga esos valores — cambiar esto rompería el golden dataset (`packages/cl/test/fixtures/golden.json`) y requeriría un major bump.
- **Dataset de comunas sin validar contra la fuente oficial**: `packages/cl/src/data/comunas.ts` trae una nota interna pendiente desde el scaffold inicial: el dataset fue generado a partir de conocimiento entrenado, no descargado en vivo desde SUBDERE. Validar contra la fuente oficial antes de garantizar exactitud 100% — relevante para el principio de "datos culturalmente correctos" del proyecto.
