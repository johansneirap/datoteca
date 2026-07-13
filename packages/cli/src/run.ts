import { Command, CommanderError } from 'commander';
import { registerRutCommand } from './commands/rut.js';
import { registerPersonCommand } from './commands/person.js';
import { registerAddressCommand } from './commands/address.js';
import { registerPhoneCommand } from './commands/phone.js';
import { registerMoneyCommand } from './commands/money.js';
import { registerCompanyCommand } from './commands/company.js';
import type { Io } from './types.js';

const SUCCESSFUL_EXIT_CODES = new Set(['commander.helpDisplayed', 'commander.version']);

/**
 * Crea el programa de Commander con todos los subcomandos registrados
 * (`rut`, `person`, `address`, `phone`, `money`, `company`).
 *
 * Creates the Commander program with all subcommands registered
 * (`rut`, `person`, `address`, `phone`, `money`, `company`).
 *
 * @param io - Abstracción de stdout/stderr a usar. / stdout/stderr abstraction to use.
 * @returns El programa de Commander listo para parsear argumentos. / The Commander program ready to parse arguments.
 */
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

/**
 * Crea la implementación de {@link Io} por defecto, que escribe directamente
 * a `process.stdout`/`process.stderr`.
 *
 * Creates the default {@link Io} implementation, which writes directly to
 * `process.stdout`/`process.stderr`.
 *
 * @returns Una instancia de {@link Io} que usa los streams reales del proceso. / An {@link Io} instance that uses the process's real streams.
 */
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

/**
 * Punto de entrada programático del CLI: parsea `argv`, ejecuta el subcomando
 * correspondiente y devuelve el código de salida del proceso.
 *
 * Programmatic entry point of the CLI: parses `argv`, runs the matching
 * subcommand, and returns the process exit code.
 *
 * @param argv - Argumentos de línea de comandos (formato de `process.argv`). / Command-line arguments (in `process.argv` format).
 * @param io - Abstracción de stdout/stderr a usar. / stdout/stderr abstraction to use.
 * @returns El código de salida del proceso. / The process exit code.
 */
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
