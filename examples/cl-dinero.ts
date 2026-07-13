import { Datoteca } from '@datoteca/cl';

const dl = new Datoteca({ seed: 123 });

// Dígito verificador de forma independiente (método estático, no requiere seed)
Datoteca.calcularDV(12345678); // "5"

// Dinero con rango personalizado
dl.dinero.clp({ min: 10_000, max: 200_000 });
dl.dinero.uf(); // "UF 1.234,56"

// `dinero.clp()`/`dinero.uf()` devuelven el string ya formateado; si necesitas
// operar el valor (sumar, comparar, etc.), usa la variante numérica:
dl.dinero.clpNumero(); // 45000        (number, sin formatear)
dl.dinero.ufNumero(); // 1234.56      (number, hasta 2 decimales)
