export type OutputFormat = 'json' | 'csv' | 'ndjson';

export type Row = Record<string, string | number>;

export interface Io {
  stdout: (chunk: string) => void;
  stderr: (chunk: string) => void;
}

export interface CommonOptions {
  seed: number | string;
  count: number;
  format: OutputFormat;
}
