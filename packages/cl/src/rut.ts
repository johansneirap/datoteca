import type { Rng } from '@datoteca/core';

/**
 * Formato de salida para un RUT generado.
 *
 * Output format for a generated RUT.
 */
export type RutFormat = 'raw' | 'dash' | 'dots';

/**
 * Opciones para generar un RUT chileno.
 *
 * Options for generating a Chilean RUT.
 */
export interface RutOptions {
  /** Formato de salida del número. / Output format of the number. */
  format?: RutFormat;
  /** Si se incluye el dígito verificador. / Whether to include the check digit. */
  dv?: boolean;
}

const PERSONA_MIN = 1_000_000;
const PERSONA_MAX = 25_000_000;

// El SII asigna RUT de personas jurídicas (empresas) a partir de 50.000.000.
const EMPRESA_MIN = 50_000_000;
const EMPRESA_MAX = 99_999_999;

/**
 * Calcula el dígito verificador de un RUT chileno con el algoritmo módulo 11 estándar.
 *
 * Computes the check digit of a Chilean RUT using the standard modulo-11 algorithm.
 *
 * @param numero - Número base del RUT (sin dígito verificador). / Base RUT number (without check digit).
 * @returns El dígito verificador: `'0'`-`'9'` o `'K'`. / The check digit: `'0'`-`'9'` or `'K'`.
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

function generarRutEnRango(rng: Rng, min: number, max: number, options: RutOptions): string {
  const { format = 'dash', dv = true } = options;
  const numero = rng.intBetween(min, max);
  const numeroFormateado = formatearNumero(numero, format);

  if (!dv) {
    return numeroFormateado;
  }

  const digitoVerificador = calcularDV(numero);
  const separador = format === 'raw' ? '' : '-';
  return `${numeroFormateado}${separador}${digitoVerificador}`;
}

/**
 * Genera un RUT de persona natural (rango 1.000.000-25.000.000).
 *
 * Generates a natural-person RUT (range 1,000,000-25,000,000).
 *
 * @param rng - Generador de números aleatorios determinístico. / Deterministic random number generator.
 * @param options - Formato de salida y si incluir el dígito verificador. / Output format and whether to include the check digit.
 * @returns El RUT generado como string, en el formato pedido. / The generated RUT as a string, in the requested format.
 */
export function generarRut(rng: Rng, options: RutOptions = {}): string {
  return generarRutEnRango(rng, PERSONA_MIN, PERSONA_MAX, options);
}

/**
 * Genera un RUT de persona jurídica / empresa (rango 50.000.000-99.999.999).
 *
 * Generates a legal-entity/company RUT (range 50,000,000-99,999,999).
 *
 * @param rng - Generador de números aleatorios determinístico. / Deterministic random number generator.
 * @param options - Formato de salida y si incluir el dígito verificador. / Output format and whether to include the check digit.
 * @returns El RUT generado como string, en el formato pedido. / The generated RUT as a string, in the requested format.
 */
export function generarRutEmpresa(rng: Rng, options: RutOptions = {}): string {
  return generarRutEnRango(rng, EMPRESA_MIN, EMPRESA_MAX, options);
}
