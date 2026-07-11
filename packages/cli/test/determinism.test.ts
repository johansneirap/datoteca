import { describe, expect, it } from 'vitest';
import { invoke } from './helpers.js';

describe('determinismo', () => {
  it('misma seed y mismos flags producen exactamente el mismo output en dos invocaciones', async () => {
    const argsList = [
      ['person', '--seed', '2026', '--count', '5', '--format', 'csv'],
      [
        'money',
        '--seed',
        'lote-qa-1',
        '--count',
        '4',
        '--currency',
        'UF',
        '--min',
        '10',
        '--max',
        '500',
      ],
      ['rut', '--seed', '777', '--count', '10', '--rut-format', 'dots'],
      ['address', '--seed', '42', '--count', '3', '--format', 'ndjson'],
    ];

    for (const args of argsList) {
      const first = await invoke(args);
      const second = await invoke(args);
      expect(second.stdout).toBe(first.stdout);
      expect(second.exitCode).toBe(first.exitCode);
    }
  });

  it('seeds distintas producen output distinto', async () => {
    const a = await invoke(['company', '--seed', '1', '--count', '3']);
    const b = await invoke(['company', '--seed', '2', '--count', '3']);
    expect(a.stdout).not.toBe(b.stdout);
  });
});
