import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const CLI_PATH = fileURLToPath(new URL('../dist/cli.js', import.meta.url));

// Requiere haber corrido `pnpm build` antes (dist/cli.js). El resto de los tests
// del CLI usan runCli() en proceso; este es el único que spawnea el binario real,
// tal como lo invocaría un usuario vía `npx datoteca`.
describe.skipIf(!existsSync(CLI_PATH))('binario compilado (proceso real)', () => {
  it('ejecuta dist/cli.js como proceso hijo y produce JSON válido', () => {
    const output = execFileSync('node', [CLI_PATH, 'rut', '--seed', '1', '--count', '2'], {
      encoding: 'utf-8',
    });
    const rows = JSON.parse(output);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveProperty('rut');
  });

  it('sale con código distinto de 0 ante argumentos inválidos', () => {
    expect(() =>
      execFileSync('node', [CLI_PATH, 'person', '--count', 'abc'], {
        encoding: 'utf-8',
        stdio: 'pipe',
      }),
    ).toThrow();
  });
});
