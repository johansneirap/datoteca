<a name="readme-top"></a>

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06B6D4,100:9333EA&height=200&section=header&text=Datoteca&fontSize=70&fontColor=ffffff&fontAlignY=35&desc=Datos%20de%20prueba%20deterministicos%20por%20seed&descAlignY=58&descSize=20&animation=fadeIn" alt="Datoteca" width="100%" />

# Datoteca

Librería TypeScript para generar datos de prueba realistas y localizados de Chile — determinística por seed.

[![npm version][npm-shield]][npm-url]
[![License][license-shield]][license-url]
[![CI Status][ci-shield]][ci-url]

</div>

<details>
  <summary>Tabla de contenidos</summary>
  <ol>
    <li><a href="#sobre-el-proyecto">Sobre el proyecto</a></li>
    <li><a href="#construido-con">Construido con</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#uso">Uso</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Sobre el proyecto

**Datoteca** es un monorepo de librerías TypeScript para generar datos de prueba realistas y culturalmente correctos por país, empezando por Chile (`@datoteca/cl`). El nombre evita deliberadamente acoplarse a una región geográfica tipo "latam" — cada país es un paquete propio (`@datoteca/cl`, y en el futuro `@datoteca/pe`, `@datoteca/ar`, `@datoteca/es`...) sobre una base compartida (`@datoteca/core`).

¿Por qué existe? Porque generar datos de prueba "parecidos" a los reales no alcanza en dominios donde el formato importa — sobre todo en **fintech y banca**:

- Un RUT no es solo un número con guion: necesita un dígito verificador matemáticamente válido (módulo 11), o los formularios y validaciones que lo consumen lo van a rechazar.
- Una comuna no puede ser inventada: `direccion.comuna()` solo devuelve comunas reales, tomadas de la división político-administrativa oficial (SUBDERE).
- El dinero se muestra como se muestra en Chile: `$45.000`, `UF 1.234,56`, vía `Intl.NumberFormat('es-CL')`.

Y determinístico por seed: misma seed + mismo orden de llamadas → mismos resultados, para tests reproducibles.

**¿Por qué no usar directamente [@faker-js/faker](https://fakerjs.dev/) y su locale `es_CL`?** No es un reemplazo, es un complemento. Faker es excelente para datos genéricos multi-locale (nombres, lorem, internet, etc.), pero no baja al detalle de un dato específico de un país como el RUT chileno con su algoritmo de verificación, o un listado exhaustivo y real de comunas. Datoteca se enfoca en ese detalle local que un generador generalista no puede cubrir bien para todos los países a la vez.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Construido con

- [TypeScript](https://www.typescriptlang.org/) en modo `strict` + `noUncheckedIndexedAccess`
- [tsup](https://tsup.egoist.dev/) — build a ESM + CJS + `.d.ts` por paquete
- [Vitest](https://vitest.dev/) — tests de formato y determinismo por generador
- [Commander](https://github.com/tj/commander.js) — parsing de argumentos de `@datoteca/cli`
- [pnpm workspaces](https://pnpm.io/workspaces) — monorepo
- [Changesets](https://github.com/changesets/changesets) — versionado y publicación

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

- Node.js `>= 18`
- [pnpm](https://pnpm.io/) (el repo usa `pnpm@9.12.0` vía `packageManager`)

### Installation

```sh
npm install @datoteca/cl
```

o con pnpm:

```sh
pnpm add @datoteca/cl
```

`@datoteca/core` es una dependencia interna de `@datoteca/cl` (PRNG y helpers compartidos) y se instala automáticamente — no hace falta agregarlo a mano.

¿No querís escribir código? Usa el CLI directo con `npx`, sin instalar nada:

```sh
npx @datoteca/cli person --seed 42 --count 3
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Uso

Instancia `Datoteca` con una seed. Sin estado global: la misma seed, en el mismo orden de llamadas, siempre produce el mismo resultado.

```ts
import { Datoteca } from '@datoteca/cl';

const dl = new Datoteca({ seed: 123 });

dl.rut(); // "12345678-9"
dl.persona.nombreCompleto(); // "María González Soto"
dl.direccion.direccionCompleta(); // "Los Aromos 482, Providencia"
dl.telefono.movil(); // "+56 9 1234 5678"
dl.dinero.clp(); // "$45.000"
```

RUT con distintas opciones de formato:

```ts
dl.rut(); // "12345678-9"    (format: 'dash', default)
dl.rut({ format: 'dots' }); // "12.345.678-9"
dl.rut({ format: 'raw' }); // "123456789"
dl.rut({ dv: false }); // "12345678"     (sin dígito verificador)
```

`rut()` en la raíz genera RUT de persona natural. Si necesitas distinguir explícitamente entre persona natural y empresa (el SII asigna RUT de personas jurídicas desde el 50.000.000), usa los generadores por namespace:

```ts
dl.persona.rut(); // "12345678-9"    (rango persona natural: 1.000.000-25.000.000)
dl.empresa.rut(); // "76543210-K"    (rango empresa: 50.000.000-99.999.999)
```

Ambos aceptan las mismas opciones (`format`, `dv`) que `rut()`.

Dígito verificador de forma independiente (método estático, no requiere seed) y dinero con rango personalizado:

```ts
Datoteca.calcularDV(12345678); // "5"

dl.dinero.clp({ min: 10_000, max: 200_000 });
dl.dinero.uf(); // "UF 1.234,56"
```

`dinero.clp()`/`dinero.uf()` devuelven el string ya formateado; si necesitas operar el valor (sumar, comparar, etc.), usa la variante numérica:

```ts
dl.dinero.clpNumero(); // 45000        (number, sin formatear)
dl.dinero.ufNumero(); // 1234.56      (number, hasta 2 decimales)
```

Namespaces disponibles en el MVP: `persona`, `direccion`, `telefono`, `dinero`, `banco`, `empresa`, más `rut()` en la raíz por ser el dato más emblemático.

### CLI

[`@datoteca/cli`](./packages/cli) expone los mismos generadores desde la terminal — pensado para poblar fixtures rápido, generar CSV/JSON para QA, o usarlo desde stacks no-JS (Go, Python, etc.), sin escribir código:

```sh
npx @datoteca/cli rut --seed 42 --count 5
npx @datoteca/cli money --seed 42 --currency UF --min 10 --max 500 --format csv > fixtures.csv
```

Un subcomando por generador (`rut`, `person`, `address`, `phone`, `money`, `company`), formatos `json`/`csv`/`ndjson`, y la misma garantía de determinismo por seed. Ver el [README de `@datoteca/cli`](./packages/cli/README.md) para la referencia completa de comandos y flags.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

**MVP v0.x — implementado**

- [x] `@datoteca/core`: PRNG determinístico (mulberry32) + helpers (`pickOne`, `pickWeighted`, `intBetween`, `arrayOf`)
- [x] `rut()` con formatos `dash`/`dots`/`raw`, dígito verificador módulo 11, y `Datoteca.calcularDV()` estático — más `persona.rut()`/`empresa.rut()` como generadores separados por rango
- [x] `persona` — nombre, apellido, nombre completo
- [x] `direccion` — comuna (dataset real SUBDERE), calle, dirección completa
- [x] `telefono` — móvil, fijo
- [x] `dinero` — CLP, UF (formateados en `es-CL`), más `clpNumero()`/`ufNumero()` para quien necesite operar los valores
- [x] `banco` — nombre, cuenta
- [x] `empresa` — razón social, giro
- [x] Build (tsup ESM+CJS+d.ts), Changesets, CI y release workflows en GitHub Actions
- [x] Golden dataset de seeds documentadas para snapshot testing (ver [docs/determinism.md](./docs/determinism.md))
- [x] `@datoteca/cli` (`npx @datoteca/cli ...`) — un subcomando por generador, formatos json/csv/ndjson

**Backlog — fuera del MVP**

- [ ] Otros países/locales (`@datoteca/pe`, `@datoteca/ar`, `@datoteca/es`, ...)

<!-- TODO: agregar link a GitHub Issues cuando el repo tenga labels/triage configurado -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Las contribuciones son bienvenidas.

1. Haz fork del proyecto
2. Crea tu rama de feature (`git checkout -b feat/mi-generador`)
3. Haz commit de tus cambios siguiendo [Conventional Commits](https://www.conventionalcommits.org/) con scope de paquete cuando aplique (`git commit -m 'feat(cl): agrega generador de X'`)
4. Verifica antes de subir: `pnpm build`, `pnpm test`, `pnpm lint`, `pnpm typecheck`
5. Push a tu rama (`git push origin feat/mi-generador`)
6. Abre un Pull Request

Prefijos usados en este repo: `feat`, `fix`, `chore`, `docs`, `ci`, `build`, `test`, con scope entre paréntesis (`core`, `cl`) cuando el cambio es específico de un paquete.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distribuido bajo la licencia MIT. Ver [`LICENSE`](./LICENSE) para más información.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

[@johansneirap](https://github.com/johansneirap) — johansneirap@gmail.com

Repo: [github.com/johansneirap/datoteca](https://github.com/johansneirap/datoteca)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[npm-shield]: https://img.shields.io/npm/v/%40datoteca%2Fcl.svg?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/@datoteca/cl
[license-shield]: https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge
[license-url]: ./LICENSE
[ci-shield]: https://img.shields.io/github/actions/workflow/status/johansneirap/datoteca/ci.yml?branch=main&style=for-the-badge&label=CI
[ci-url]: https://github.com/johansneirap/datoteca/actions/workflows/ci.yml
