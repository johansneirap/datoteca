# @datoteca/core

PRNG determinístico y helpers compartidos para los paquetes de [Datoteca](https://github.com/johansneirap/datoteca) — generadores de datos de prueba localizados por país.

La mayoría de los usuarios no necesita instalar este paquete directamente: es una dependencia interna de los paquetes de país (por ejemplo [`@datoteca/cl`](https://www.npmjs.com/package/@datoteca/cl)). Instálalo directo solo si quieres construir tu propio generador determinístico por seed.

## Instalación

```sh
npm install @datoteca/core
```

## Uso

```ts
import { createRng } from '@datoteca/core';

const rng = createRng(123); // number o string

rng.random(); // float en [0, 1)
rng.intBetween(1, 10); // entero en [1, 10]
rng.pickOne(['a', 'b', 'c']); // elige uno, uniforme
rng.pickWeighted([
  { value: 'comun', weight: 9 },
  { value: 'raro', weight: 1 },
]);
rng.arrayOf(5, (i) => i * 2); // [0, 2, 4, 6, 8]
```

Sin estado global: cada llamada a `createRng(seed)` crea una instancia independiente. Misma seed + mismo orden de llamadas → mismos resultados. El PRNG es [mulberry32](https://github.com/bryc/code/blob/master/jshash/PRNGs.md#mulberry32) (rápido, sin dependencias, no criptográfico). Si la seed es un string, se hashea a número con xfnv1a antes de inicializar el PRNG.

## API

| Función | Descripción |
| --- | --- |
| `createRng(seed: number \| string)` | Crea una instancia de `Rng` |
| `rng.random()` | Float en `[0, 1)` |
| `rng.intBetween(min, max)` | Entero en `[min, max]` inclusive |
| `rng.pickOne(items)` | Elige un elemento al azar, distribución uniforme |
| `rng.pickWeighted(items)` | Elige según `{ value, weight }[]` |
| `rng.arrayOf(count, factory)` | Genera un array de `count` elementos |

También se exportan `mulberry32`, `xfnv1a` y `normalizeSeed` para quien necesite el PRNG crudo.

## Licencia

MIT — ver [LICENSE](https://github.com/johansneirap/datoteca/blob/main/packages/core/LICENSE).
