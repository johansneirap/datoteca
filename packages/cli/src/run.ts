import { Command, CommanderError } from 'commander';
import { registerRutCommand } from './commands/rut.js';
import { registerPersonCommand } from './commands/person.js';
import { registerAddressCommand } from './commands/address.js';
import { registerPhoneCommand } from './commands/phone.js';
import { registerMoneyCommand } from './commands/money.js';
import { registerCompanyCommand } from './commands/company.js';
import type { Io } from './types.js';

const SUCCESSFUL_EXIT_CODES = new Set(['commander.helpDisplayed', 'commander.version']);

export function createProgram(io: Io): Command {
  const program = new Command();

  program
    .name('datoteca')
    .description('Genera datos de prueba realistas y localizados de Chile desde la terminal')
    .configureOutput({
      writeOut: (str) => io.stdout(str),
      writeErr: (str) => io.stderr(str),
    })
    .exitOverride();

  // El orden importa: exitOverride/configureOutput deben estar seteados antes de
  // registrar subcomandos, porque Command.command() copia esta config al crearlos.
  registerRutCommand(program, io);
  registerPersonCommand(program, io);
  registerAddressCommand(program, io);
  registerPhoneCommand(program, io);
  registerMoneyCommand(program, io);
  registerCompanyCommand(program, io);

  return program;
}

export function defaultIo(): Io {
  return {
    stdout: (chunk) => {
      process.stdout.write(chunk);
    },
    stderr: (chunk) => {
      process.stderr.write(chunk);
    },
  };
}

export async function runCli(argv: string[], io: Io = defaultIo()): Promise<number> {
  const program = createProgram(io);

  try {
    await program.parseAsync(argv);
    return 0;
  } catch (error) {
    if (error instanceof CommanderError) {
      if (SUCCESSFUL_EXIT_CODES.has(error.code)) {
        return 0;
      }
      return error.exitCode || 1;
    }

    const message = error instanceof Error ? error.message : String(error);
    io.stderr(`Error: ${message}\n`);
    return 1;
  }
}
