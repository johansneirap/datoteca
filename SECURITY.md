# Política de seguridad

## Reportar una vulnerabilidad

Si encuentras una vulnerabilidad de seguridad en `@datoteca/core` o `@datoteca/cl`, **no abras un issue público**. Repórtala de forma privada por correo a:

**johansneirap@gmail.com**

Este repositorio aún no tiene configurado [GitHub Security Advisories](https://docs.github.com/en/code-security/security-advisories), así que el email es el único canal de reporte por ahora.

Incluye en tu reporte, si es posible:

- Paquete y versión afectada (`@datoteca/core` / `@datoteca/cl`)
- Descripción de la vulnerabilidad y su impacto
- Pasos o código para reproducirla
- Versión de Node y sistema operativo, si es relevante

Vas a recibir una respuesta en un plazo razonable confirmando la recepción del reporte. Coordina conmigo el momento de divulgación pública una vez que exista un fix disponible.

## Versiones soportadas

Mientras los paquetes estén en `v0.x` (desarrollo inicial, sin garantía de estabilidad de API según [SemVer](https://semver.org/#spec-item-4)), solo la **última versión publicada** de cada paquete recibe parches de seguridad.

| Paquete           | Versión | Soportada |
| ------------------ | ------- | :-------: |
| `@datoteca/core`   | última `0.x` | ✅ |
| `@datoteca/core`   | versiones anteriores | ❌ |
| `@datoteca/cl`     | última `0.x` | ✅ |
| `@datoteca/cl`     | versiones anteriores | ❌ |

<!-- TODO: revisar esta política cuando se publique la v1.0.0 — probablemente pase a soportar la última minor de cada major. -->
