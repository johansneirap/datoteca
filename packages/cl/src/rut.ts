import type { Rng } from '@datoteca/core';

export type RutFormat = 'raw' | 'dash' | 'dots';

export interface RutOptions {
  format?: RutFormat;
  dv?: boolean;
}

const RUT_MIN = 1_000_000;
const RUT_MAX = 25_000_000;

/**
 * Calcula el dígito verificador de un RUT chileno con el algoritmo módulo 11 estándar.
 */
export function calcularDV(numero: number): string {
  let suma = 0;
  let multiplicador = 2;
  let resto = Math.trunc(numero);

  while (resto > 0) {
    suma += (resto % 10) * multiplicador;
    resto = Math.trunc(resto / 10);
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const dv = 11 - (suma % 11);
  if (dv === 11) return '0';
  if (dv === 10) return 'K';
  return String(dv);
}

function formatearNumero(numero: number, format: RutFormat): string {
  if (format !== 'dots') {
    return String(numero);
  }
  const digitos = String(numero);
  let conPuntos = '';
  for (let i = 0; i < digitos.length; i++) {
    const posDesdeElFinal = digitos.length - i;
    conPuntos += digitos[i];
    if (posDesdeElFinal > 1 && posDesdeElFinal % 3 === 1) {
      conPuntos += '.';
    }
  }
  return conPuntos;
}

export function generarRut(rng: Rng, options: RutOptions = {}): string {
  const { format = 'dash', dv = true } = options;
  const numero = rng.intBetween(RUT_MIN, RUT_MAX);
  const numeroFormateado = formatearNumero(numero, format);

  if (!dv) {
    return numeroFormateado;
  }

  const digitoVerificador = calcularDV(numero);
  const separador = format === 'raw' ? '' : '-';
  return `${numeroFormateado}${separador}${digitoVerificador}`;
}
