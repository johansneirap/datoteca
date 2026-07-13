import { Command } from 'commander';
import { Datoteca } from '@datoteca/cl';
import { withCommonOptions } from '../options.js';
import { serializeRows } from '../format.js';
import type { CommonOptions, Io, Row } from '../types.js';

/**
 * Registra el subcomando `phone` en el programa de Commander.
 *
 * Registers the `phone` subcommand on the Commander program.
 *
 * @param program - Programa de Commander al que agregar el subcomando. / Commander program to add the subcommand to.
 * @param io - Abstracción de stdout/stderr a usar. / stdout/stderr abstraction to use.
 */
export function registerPhoneCommand(program: Command, io: Io): void {
  const command = withCommonOptions(
    program.command('phone').description('Genera teléfonos chilenos'),
  );

  command.action((options: CommonOptions) => {
    const dl = new Datoteca({ seed: options.seed });
    const rows: Row[] = Array.from({ length: options.count }, () => ({
      mobile: dl.telefono.movil(),
      landline: dl.telefono.fijo(),
    }));
    io.stdout(serializeRows(rows, options.format) + '\n');
  });
}
