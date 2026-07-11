# @datoteca/cl

Generador de datos de prueba realistas y culturalmente correctos para Chile — determinístico por seed. Parte del proyecto [Datoteca](https://github.com/johansneirap/datoteca).

RUT con dígito verificador matemáticamente válido, comunas reales (SUBDERE), dinero formateado en `es-CL` — pensado para dominios donde el formato importa, como fintech y banca. Complementa a librerías generalistas como [Faker](https://fakerjs.dev/), no las reemplaza: Datoteca se enfoca en el detalle específico de cada país.

## Instalación

```sh
npm install @datoteca/cl
```

`@datoteca/core` (PRNG y helpers compartidos) se instala automáticamente como dependencia — no hace falta agregarlo a mano.

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

Dígito verificador de forma independiente (método estático, no requiere seed) y dinero con rango personalizado:

```ts
Datoteca.calcularDV(12345678); // "5"

dl.dinero.clp({ min: 10_000, max: 200_000 });
dl.dinero.uf(); // "UF 1.234,56"

dl.dinero.clpNumero(); // 45000       (number, sin formatear)
dl.dinero.ufNumero(); // 1234.56     (number, hasta 2 decimales)
```

## Namespaces

| Namespace | Métodos |
| --- | --- |
| raíz | `rut(options?)`, `Datoteca.calcularDV(numero)` |
| `persona` | `nombre()`, `apellido()`, `nombreCompleto()` |
| `direccion` | `comuna()`, `calle()`, `direccionCompleta()` |
| `telefono` | `movil()`, `fijo()` |
| `dinero` | `clp(options?)`, `uf(options?)`, `clpNumero(options?)`, `ufNumero(options?)` |
| `banco` | `nombre()`, `cuenta()` |
| `empresa` | `razonSocial()`, `giro()` |

Documentación completa, roadmap y guía de contribución en el [repo principal](https://github.com/johansneirap/datoteca).

## Licencia

MIT — ver [LICENSE](https://github.com/johansneirap/datoteca/blob/main/packages/cl/LICENSE).
