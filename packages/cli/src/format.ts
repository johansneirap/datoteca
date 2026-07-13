import type { OutputFormat, Row } from './types.js';

/**
 * Serializa filas de datos generados al formato de salida pedido.
 *
 * Serializes generated data rows into the requested output format.
 *
 * @param rows - Filas a serializar. / Rows to serialize.
 * @param format - Formato de salida (`json`, `ndjson` o `csv`). / Output format (`json`, `ndjson`, or `csv`).
 * @returns El texto serializado en el formato pedido. / The serialized text in the requested format.
 */
export function serializeRows(rows: readonly Row[], format: OutputFormat): string {
  switch (format) {
    case 'json':
      return toJson(rows);
    case 'ndjson':
      return toNdjson(rows);
    case 'csv':
      return toCsv(rows);
  }
}

function toJson(rows: readonly Row[]): string {
  return JSON.stringify(rows, null, 2);
}

function toNdjson(rows: readonly Row[]): string {
  return rows.map((row) => JSON.stringify(row)).join('\n');
}

function toCsv(rows: readonly Row[]): string {
  if (rows.length === 0) {
    return '';
  }
  const headers = Object.keys(rows[0] as Row);
  const lines = [headers.map(csvEscape).join(',')];
  for (const row of rows) {
    lines.push(headers.map((header) => csvEscape(String(row[header]))).join(','));
  }
  return lines.join('\n');
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
