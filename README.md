# Datoteca

Generador de datos de prueba realistas para Latinoamérica y España, con seeds determinísticos.

MVP: `@datoteca/cl` (Chile).

## Estructura

```
packages/
  core/   # @datoteca/core — PRNG determinístico, tipos base
  cl/     # @datoteca/cl   — MVP: Chile
```

## Uso

```ts
import { Datoteca } from '@datoteca/cl';

const dl = new Datoteca({ seed: 123 });

dl.rut();                          // "12345678-9"
dl.persona.nombreCompleto();
dl.direccion.direccionCompleta();
dl.telefono.movil();
dl.dinero.clp();
dl.banco.nombre();
dl.empresa.razonSocial();
```

## Desarrollo

```
pnpm install
pnpm build
pnpm test
pnpm typecheck
pnpm lint
```

## Pendiente

- Reservar el scope `@datoteca` en npm antes del primer publish.
- El dataset de comunas (`packages/cl/src/data/comunas.ts`) fue generado a partir de
  conocimiento entrenado, no descargado en vivo desde SUBDERE — validar antes de publicar.
- Ver `SPEC.md` para el backlog completo fuera del MVP.
