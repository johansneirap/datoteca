import type { Datoteca } from '../src/index.js';

/**
 * Seeds fijas para el golden dataset. Elegidas para cubrir casos chicos, medianos y
 * grandes de hash de seed numérica (ver normalizeSeed en @datoteca/core).
 */
export const GOLDEN_SEEDS = [1, 42, 12345] as const;

export interface GoldenEntry {
  call: string;
  value: string | number;
}

/**
 * Secuencia FIJA y documentada de llamadas contra una instancia de Datoteca.
 *
 * El orden importa: todos los namespaces comparten un único stream de RNG por
 * instancia, así que agregar, quitar o reordenar una llamada acá desplaza el
 * stream y cambia todos los valores esperados subsecuentes. Este archivo es la
 * única fuente de verdad de la secuencia — tanto golden.test.ts (compara) como
 * scripts/generate-golden.ts (regenera) importan esta misma función para que
 * nunca queden desincronizados entre sí.
 */
export function runGoldenSequence(dl: Datoteca): GoldenEntry[] {
  const entries: GoldenEntry[] = [];
  const record = (call: string, value: string | number): void => {
    entries.push({ call, value });
  };

  record('rut()', dl.rut());
  record("rut({ format: 'dots', dv: false })", dl.rut({ format: 'dots', dv: false }));
  record('persona.nombre()', dl.persona.nombre());
  record('persona.apellido()', dl.persona.apellido());
  record('persona.nombreCompleto()', dl.persona.nombreCompleto());
  record('direccion.comuna()', dl.direccion.comuna());
  record('direccion.calle()', dl.direccion.calle());
  record('direccion.direccionCompleta()', dl.direccion.direccionCompleta());
  record('telefono.movil()', dl.telefono.movil());
  record('telefono.fijo()', dl.telefono.fijo());
  record('dinero.clpNumero()', dl.dinero.clpNumero());
  record('dinero.clp({ min: 10000, max: 20000 })', dl.dinero.clp({ min: 10_000, max: 20_000 }));
  record('dinero.ufNumero()', dl.dinero.ufNumero());
  record('dinero.uf()', dl.dinero.uf());
  record('banco.nombre()', dl.banco.nombre());
  record('banco.cuenta()', dl.banco.cuenta());
  record('empresa.razonSocial()', dl.empresa.razonSocial());
  record('empresa.giro()', dl.empresa.giro());

  return entries;
}
