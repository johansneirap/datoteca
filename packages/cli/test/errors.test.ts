import { describe, expect, it } from 'vitest';
import { invoke } from './helpers.js';

describe('manejo de argumentos inválidos', () => {
  it('count negativo produce exit code distinto de 0 y mensaje claro en stderr', async () => {
    const { exitCode, stderr } = await invoke(['person', '--count', '-3']);
    expect(exitCode).not.toBe(0);
    expect(stderr).toMatch(/count/i);
  });

  it('count no numérico produce exit code distinto de 0', async () => {
    const { exitCode, stderr } = await invoke(['person', '--count', 'abc']);
    expect(exitCode).not.toBe(0);
    expect(stderr).toMatch(/count/i);
  });

  it('seed vacía produce exit code distinto de 0', async () => {
    const { exitCode, stderr } = await invoke(['person', '--seed', '']);
    expect(exitCode).not.toBe(0);
    expect(stderr).toMatch(/seed/i);
  });

  it('--format inválido produce exit code distinto de 0', async () => {
    const { exitCode, stderr } = await invoke(['person', '--format', 'xml']);
    expect(exitCode).not.toBe(0);
    expect(stderr.length).toBeGreaterThan(0);
  });

  it('rut --rut-format inválido produce exit code distinto de 0', async () => {
    const { exitCode, stderr } = await invoke(['rut', '--rut-format', 'invalid']);
    expect(exitCode).not.toBe(0);
    expect(stderr.length).toBeGreaterThan(0);
  });

  it('money con --min mayor que --max produce exit code distinto de 0 y mensaje explícito', async () => {
    const { exitCode, stderr } = await invoke(['money', '--min', '100', '--max', '10']);
    expect(exitCode).not.toBe(0);
    expect(stderr).toMatch(/--min.*--max/);
  });

  it('comando desconocido produce exit code distinto de 0', async () => {
    const { exitCode } = await invoke(['no-existe']);
    expect(exitCode).not.toBe(0);
  });

  it('--help produce exit code 0 y muestra uso en stdout', async () => {
    const { exitCode, stdout } = await invoke(['--help']);
    expect(exitCode).toBe(0);
    expect(stdout).toContain('Usage:');
  });
});
