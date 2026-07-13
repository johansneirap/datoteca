import { Command, InvalidArgumentError, Option } from 'commander';

/**
 * Parsea el flag `--seed`, convirtiéndolo a número cuando el texto completo
 * es un entero. El seed de `@datoteca/cl` acepta `number | string` (los strings
 * se hashean vía `xfnv1a`); solo se convierte a number aquí cuando el texto
 * completo es un entero, para no truncar silenciosamente floats vía el
 * `seed >>> 0` interno de `normalizeSeed`.
 *
 * Parses the `--seed` flag, converting it to a number when the full text is
 * an integer. The seed for `@datoteca/cl` accepts `number | string` (strings
 * are hashed via `xfnv1a`); it is only converted to a number here when the
 * full text is an integer, to avoid silently truncating floats via
 * `normalizeSeed`'s internal `seed >>> 0`.
 *
 * @param value - Valor crudo recibido de la línea de comandos. / Raw value received from the command line.
 * @returns La seed parseada. / The parsed seed.
 */
export function parseSeed(value: string): number | string {
  const trimmed = value.trim();
  if (trimmed === '') {
    throw new InvalidArgumentError('seed no puede estar vacía.');
  }
  return /^-?\d+$/.test(trimmed) ? Number(trimmed) : value;
}

/**
 * Parsea el flag `--count`, validando que sea un entero positivo.
 *
 * Parses the `--count` flag, validating that it is a positive integer.
 *
 * @param value - Valor crudo recibido de la línea de comandos. / Raw value received from the command line.
 * @returns El count parseado. / The parsed count.
 */
export function parseCount(value: string): number {
  if (!/^\d+$/.test(value.trim())) {
    throw new InvalidArgumentError(`count debe ser un entero positivo, recibido: "${value}".`);
  }
  const count = Number(value);
  if (count < 1) {
    throw new InvalidArgumentError('count debe ser >= 1.');
  }
  return count;
}

/**
 * Crea un parser de Commander para un flag numérico arbitrario.
 *
 * Creates a Commander parser for an arbitrary numeric flag.
 *
 * @param flag - Nombre del flag, usado en el mensaje de error. / Flag name, used in the error message.
 * @returns Función parser que valida y convierte el valor a número. / Parser function that validates and converts the value to a number.
 */
export function parseNumberFlag(flag: string): (value: string) => number {
  return (value: string): number => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      throw new InvalidArgumentError(`${flag} debe ser un número, recibido: "${value}".`);
    }
    return parsed;
  };
}

/**
 * Registra las opciones comunes a todos los subcomandos (`--seed`, `--count`,
 * `--format`) en un comando de Commander.
 *
 * Registers the options common to all subcommands (`--seed`, `--count`,
 * `--format`) on a Commander command.
 *
 * @param command - Comando de Commander al que agregar las opciones. / Commander command to add the options to.
 * @returns El mismo comando, para encadenar llamadas. / The same command, for chaining.
 */
export function withCommonOptions(command: Command): Command {
  return command
    .option('-s, --seed <seed>', 'seed determinística (entero o texto)', parseSeed, 1)
    .option('-c, --count <count>', 'cantidad de registros a generar', parseCount, 1)
    .addOption(
      new Option('-f, --format <format>', 'formato de salida')
        .choices(['json', 'csv', 'ndjson'])
        .default('json'),
    );
}
