import { Command } from 'commander';
import { Datoteca } from '@datoteca/cl';
import { withCommonOptions } from '../options.js';
import { serializeRows } from '../format.js';
import type { CommonOptions, Io, Row } from '../types.js';

/**
 * Registra el subcomando `address` en el programa de Commander.
 *
 * Registers the `address` subcommand on the Commander program.
 *
 * @param program - Programa de Commander al que agregar el subcomando. / Commander program to add the subcommand to.
 * @param io - Abstracción de stdout/stderr a usar. / stdout/stderr abstraction to use.
 */
export function registerAddressCommand(program: Command, io: Io): void {
  const command = withCommonOptions(
    program.command('address').description('Genera direcciones chilenas'),
  );

  command.action((options: CommonOptions) => {
    const dl = new Datoteca({ seed: options.seed });
    const rows: Row[] = Array.from({ length: options.count }, () => ({
      commune: dl.direccion.comuna(),
      street: dl.direccion.calle(),
      fullAddress: dl.direccion.direccionCompleta(),
    }));
    io.stdout(serializeRows(rows, options.format) + '\n');
  });
}
