import { Command } from 'commander';
import { Datoteca } from '@datoteca/cl';
import { withCommonOptions } from '../options.js';
import { serializeRows } from '../format.js';
import type { CommonOptions, Io, Row } from '../types.js';

/**
 * Registra el subcomando `company` en el programa de Commander.
 *
 * Registers the `company` subcommand on the Commander program.
 *
 * @param program - Programa de Commander al que agregar el subcomando. / Commander program to add the subcommand to.
 * @param io - Abstracción de stdout/stderr a usar. / stdout/stderr abstraction to use.
 */
export function registerCompanyCommand(program: Command, io: Io): void {
  const command = withCommonOptions(
    program.command('company').description('Genera empresas chilenas'),
  );

  command.action((options: CommonOptions) => {
    const dl = new Datoteca({ seed: options.seed });
    const rows: Row[] = Array.from({ length: options.count }, () => ({
      businessName: dl.empresa.razonSocial(),
      industry: dl.empresa.giro(),
    }));
    io.stdout(serializeRows(rows, options.format) + '\n');
  });
}
