import { describe, expect, it } from 'vitest';
import { serializeRows } from '../src/format.js';

describe('serializeRows', () => {
  const rows = [
    { name: 'Ana', age: 30 },
    { name: 'Luis, Jr.', age: 25 },
  ];

  it('json: produce un array JSON legible con las mismas filas', () => {
    const output = serializeRows(rows, 'json');
    expect(JSON.parse(output)).toEqual(rows);
  });

  it('json: un array vacío produce "[]"', () => {
    expect(serializeRows([], 'json')).toBe('[]');
  });

  it('ndjson: una línea JSON por fila, sin envolver en array', () => {
    const output = serializeRows(rows, 'ndjson');
    const lines = output.split('\n');
    expect(lines).toHaveLength(2);
    expect(JSON.parse(lines[0] as string)).toEqual(rows[0]);
    expect(JSON.parse(lines[1] as string)).toEqual(rows[1]);
  });

  it('csv: agrega encabezado con las llaves de la primera fila', () => {
    const output = serializeRows(rows, 'csv');
    const [header, firstLine] = output.split('\n');
    expect(header).toBe('name,age');
    expect(firstLine).toBe('Ana,30');
  });

  it('csv: escapa valores con comas envolviéndolos en comillas', () => {
    const output = serializeRows(rows, 'csv');
    expect(output).toContain('"Luis, Jr.",25');
  });

  it('csv: escapa comillas dobles duplicándolas', () => {
    const output = serializeRows([{ note: 'dice "hola"' }], 'csv');
    expect(output.split('\n')[1]).toBe('"dice ""hola"""');
  });

  it('csv: un valor con salto de línea queda envuelto en comillas', () => {
    const output = serializeRows([{ note: 'línea1\nlínea2' }], 'csv');
    expect(output.split('\n').slice(1).join('\n')).toBe('"línea1\nlínea2"');
  });

  it('csv: un array vacío produce string vacío', () => {
    expect(serializeRows([], 'csv')).toBe('');
  });
});
