import { Command, Option } from 'commander';
import { Datoteca } from '@datoteca/cl';
import type { RutFormat } from '@datoteca/cl';
import { withCommonOptions } from '../options.js';
import { serializeRows } from '../format.js';
import type { CommonOptions, Io, Row } from '../types.js';

interface RutCliOptions extends CommonOptions {
  rutFormat: RutFormat;
  dv: boolean;
}

/**
 * Registra el subcomando `rut` en el programa de Commander.
 *
 * Registers the `rut` subcommand on the Commander program.
 *
 * @param program - Programa de Commander al que agregar el subcomando. / Commander program to add the subcommand to.
 * @param io - Abstracción de stdout/stderr a usar. / stdout/stderr abstraction to use.
 */
export function registerRutCommand(program: Command, io: Io): void {
  const command = withCommonOptions(
    program.command('rut').description('Genera RUT chilenos (persona o empresa, mismo algoritmo)'),
  );

  command
    .addOption(
      new Option('--rut-format <format>', 'formato del RUT')
        .choices(['raw', 'dash', 'dots'])
        .default('dash'),
    )
    .option('--no-dv', 'omite el dígito verificador')
    .action((options: RutCliOptions) => {
      const dl = new Datoteca({ seed: options.seed });
      const rows: Row[] = Array.from({ length: options.count }, () => ({
        rut: dl.rut({ format: options.rutFormat, dv: options.dv }),
      }));
      io.stdout(serializeRows(rows, options.format) + '\n');
    });
}
