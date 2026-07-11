import { Command } from 'commander';
import { Datoteca } from '@datoteca/cl';
import { withCommonOptions } from '../options.js';
import { serializeRows } from '../format.js';
import type { CommonOptions, Io, Row } from '../types.js';

export function registerPersonCommand(program: Command, io: Io): void {
  const command = withCommonOptions(
    program.command('person').description('Genera personas naturales'),
  );

  command.action((options: CommonOptions) => {
    const dl = new Datoteca({ seed: options.seed });
    const rows: Row[] = Array.from({ length: options.count }, () => ({
      firstName: dl.persona.nombre(),
      lastName: dl.persona.apellido(),
      fullName: dl.persona.nombreCompleto(),
    }));
    io.stdout(serializeRows(rows, options.format) + '\n');
  });
}
