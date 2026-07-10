# Contribuir a Datoteca

Gracias por tu interés en contribuir. Esta guía cubre cómo levantar el proyecto, las convenciones que usamos y el flujo para que un cambio llegue a `main`.

## Levantar el proyecto

Requisitos: Node.js `>= 18` y [pnpm](https://pnpm.io/) (el repo fija `pnpm@9.12.0` vía `packageManager` en `package.json`).

```sh
git clone git@github.com:johansneirap/datoteca.git
cd datoteca
pnpm install
```

## Comandos

Desde la raíz del monorepo (se ejecutan en cada paquete vía `pnpm -r`):

```sh
pnpm build       # build de todos los paquetes (tsup)
pnpm test        # tests con Vitest
pnpm lint        # ESLint
pnpm typecheck   # tsc --noEmit
pnpm format      # Prettier sobre packages/**/*.ts
```

Corre `pnpm build`, `pnpm test`, `pnpm lint` y `pnpm typecheck` antes de abrir un PR — el workflow de CI corre exactamente lo mismo.

## Conventional Commits

Los commits siguen [Conventional Commits](https://www.conventionalcommits.org/), y un hook de Husky + commitlint los valida localmente antes de dejarte commitear. Formato:

```
<tipo>(<scope opcional>): <descripción>
```

Tipos usados en este repo: `feat`, `fix`, `chore`, `docs`, `ci`, `build`, `test`. Scope: `core` o `cl` cuando el cambio es específico de un paquete.

Ejemplos:

```
feat(cl): agrega generador de fecha de nacimiento
fix(core): corrige redondeo en intBetween con rangos negativos
chore(release): configuración de Changesets
docs: actualiza ejemplos de uso en README
ci: agrega matriz de Node 22 a CI
```

## Changesets

Si tu cambio modifica la **API pública** de `@datoteca/core` o `@datoteca/cl` (nueva función, cambio de firma, cambio de comportamiento visible), agrega un changeset:

```sh
pnpm changeset
```

El CLI te pregunta qué paquete(s) cambiaron y el tipo de bump (`patch` / `minor` / `major`). Como el proyecto está en `v0.x`, la convención es: `minor` para funcionalidad nueva, `patch` para fixes. Esto genera un archivo en `.changeset/` que debes commitear junto con tu cambio — es lo que el workflow de release usa para versionar y armar el changelog al publicar.

Cambios internos (tooling, CI, tests, docs, refactors sin impacto en la API) **no** necesitan changeset.

## Flujo: branch → PR → CI → merge

Nunca se hace push directo a `main`.

1. Crea una rama desde `main`: `git checkout -b feat/mi-cambio`
2. Haz tus cambios y commitea siguiendo Conventional Commits
3. Si aplica, agrega un changeset (`pnpm changeset`)
4. Verifica localmente: `pnpm build && pnpm test && pnpm lint && pnpm typecheck`
5. Push a tu rama y abre un Pull Request contra `main`
6. CI corre lint/test/build en Node 18 y 20 — el PR debe pasar en verde
7. Una vez aprobado y en verde, se hace merge a `main`

Al mergear a `main`, si hay changesets pendientes, el workflow de release abre (o actualiza) un PR de "Version Packages" con los bumps de versión y el changelog. Mergear ese PR es lo que dispara la publicación a npm.
