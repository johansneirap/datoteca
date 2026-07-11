import { describe, expect, it } from 'vitest';
import { invoke } from './helpers.js';

describe('subcomandos (E2E in-process, sin spawnear proceso)', () => {
  it('rut: genera el count solicitado con forma { rut }', async () => {
    const { exitCode, stdout } = await invoke(['rut', '--seed', '1', '--count', '3']);
    expect(exitCode).toBe(0);
    const rows = JSON.parse(stdout);
    expect(rows).toHaveLength(3);
    for (const row of rows) {
      expect(Object.keys(row)).toEqual(['rut']);
      expect(typeof row.rut).toBe('string');
    }
  });

  it('rut: --rut-format dots y --no-dv cambian la forma del valor', async () => {
    const { stdout } = await invoke(['rut', '--seed', '1', '--rut-format', 'dots', '--no-dv']);
    const [row] = JSON.parse(stdout);
    expect(row.rut).toMatch(/^\d{1,2}(\.\d{3}){1,2}$/);
  });

  it('person: expone firstName/lastName/fullName', async () => {
    const { exitCode, stdout } = await invoke(['person', '--seed', '1', '--count', '2']);
    expect(exitCode).toBe(0);
    const rows = JSON.parse(stdout);
    expect(rows).toHaveLength(2);
    expect(Object.keys(rows[0]).sort()).toEqual(['firstName', 'fullName', 'lastName']);
  });

  it('address: expone commune/street/fullAddress', async () => {
    const { exitCode, stdout } = await invoke(['address', '--seed', '1', '--count', '1']);
    expect(exitCode).toBe(0);
    const [row] = JSON.parse(stdout);
    expect(Object.keys(row).sort()).toEqual(['commune', 'fullAddress', 'street']);
  });

  it('phone: expone mobile/landline con formato +56', async () => {
    const { exitCode, stdout } = await invoke(['phone', '--seed', '1', '--count', '1']);
    expect(exitCode).toBe(0);
    const [row] = JSON.parse(stdout);
    expect(row.mobile).toMatch(/^\+56 9 \d{4} \d{4}$/);
    expect(row.landline).toMatch(/^\+56 \d{1,2} \d{7,8}$/);
  });

  it('money: default CLP trae amount numérico y formatted con símbolo $', async () => {
    const { exitCode, stdout } = await invoke(['money', '--seed', '1', '--count', '1']);
    expect(exitCode).toBe(0);
    const [row] = JSON.parse(stdout);
    expect(row.currency).toBe('CLP');
    expect(typeof row.amount).toBe('number');
    expect(row.formatted).toContain('$');
  });

  it('money: --currency UF trae formatted con prefijo "UF "', async () => {
    const { exitCode, stdout } = await invoke([
      'money',
      '--seed',
      '1',
      '--currency',
      'UF',
      '--count',
      '1',
    ]);
    expect(exitCode).toBe(0);
    const [row] = JSON.parse(stdout);
    expect(row.currency).toBe('UF');
    expect((row.formatted as string).startsWith('UF ')).toBe(true);
  });

  it('money: --min/--max acotan el monto generado', async () => {
    const { stdout } = await invoke([
      'money',
      '--seed',
      '5',
      '--count',
      '20',
      '--min',
      '100',
      '--max',
      '200',
    ]);
    const rows = JSON.parse(stdout);
    for (const row of rows) {
      expect(row.amount).toBeGreaterThanOrEqual(100);
      expect(row.amount).toBeLessThanOrEqual(200);
    }
  });

  it('company: expone businessName/industry', async () => {
    const { exitCode, stdout } = await invoke(['company', '--seed', '1', '--count', '1']);
    expect(exitCode).toBe(0);
    const [row] = JSON.parse(stdout);
    expect(Object.keys(row).sort()).toEqual(['businessName', 'industry']);
  });
});
