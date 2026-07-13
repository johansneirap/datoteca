import { Datoteca } from '@datoteca/cl';

const dl = new Datoteca({ seed: 123 });

dl.rut(); // "12345678-9"    (format: 'dash', default)
dl.rut({ format: 'dots' }); // "12.345.678-9"
dl.rut({ format: 'raw' }); // "123456789"
dl.rut({ dv: false }); // "12345678"     (sin dígito verificador)

// `rut()` en la raíz genera RUT de persona natural. Si necesitas distinguir
// explícitamente entre persona natural y empresa (el SII asigna RUT de
// personas jurídicas desde el 50.000.000), usa los generadores por namespace:
dl.persona.rut(); // "12345678-9"    (rango persona natural: 1.000.000-25.000.000)
dl.empresa.rut(); // "76543210-K"    (rango empresa: 50.000.000-99.999.999)

// Ambos aceptan las mismas opciones (`format`, `dv`) que `rut()`.
dl.persona.rut({ format: 'dots', dv: false });
dl.empresa.rut({ format: 'raw' });
