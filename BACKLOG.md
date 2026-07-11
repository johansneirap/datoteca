# Backlog

Ideas y mejoras anotadas pero no implementadas todavía, junto con la razón para posponerlas.

## Developer experience

- **CODEOWNERS**: no tiene sentido con un solo colaborador. Agregar cuando haya más de una persona con permisos de review/merge.
- **Bot de stale issues/PRs** (ej. `actions/stale`): prematuro con el volumen de issues actual (cero). Reconsiderar si el backlog de issues empieza a acumular ruido sin actividad.

## Producto (ver también el Roadmap en README.md)

- Otros países/locales (`@datoteca/pe`, `@datoteca/ar`, `@datoteca/es`, ...)
- RUT de empresa vs. RUT de persona natural como generadores separados
- CLI (`npx datos-latam ...`)

## Anotado durante el desarrollo del golden dataset (fuera de alcance de esa feature)

- **`persona.nombreCompleto()` y `direccion.direccionCompleta()` no se componen de los otros métodos ya generados**: cada método hace su propio draw independiente del RNG compartido (ej. `nombre()` y el nombre dentro de `nombreCompleto()` casi nunca coinciden). Es el comportamiento actual documentado, pero vale evaluar si conviene una variante que sí componga esos valores — cambiar esto rompería el golden dataset (`packages/cl/test/fixtures/golden.json`) y requeriría un major bump.
- **Dataset de comunas sin validar contra la fuente oficial**: `packages/cl/src/data/comunas.ts` trae una nota interna pendiente desde el scaffold inicial: el dataset fue generado a partir de conocimiento entrenado, no descargado en vivo desde SUBDERE. Validar contra la fuente oficial antes de garantizar exactitud 100% — relevante para el principio de "datos culturalmente correctos" del proyecto.
