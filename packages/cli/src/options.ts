import { Command, InvalidArgumentError, Option } from 'commander';

/**
 * El seed de @datoteca/cl acepta number | string (los strings se hashean vía xfnv1a).
 * Solo se convierte a number cuando el texto completo es un entero, para no truncar
 * silenciosamente floats vía el `seed >>> 0` interno de normalizeSeed.
 */
export function parseSeed(value: string): number | string {
  const trimmed = value.trim();
  if (trimmed === '') {
    throw new InvalidArgumentError('seed no puede estar vacía.');
  }
  return /^-?\d+$/.test(trimmed) ? Number(trimmed) : value;
}

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

export function parseNumberFlag(flag: string): (value: string) => number {
  return (value: string): number => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      throw new InvalidArgumentError(`${flag} debe ser un número, recibido: "${value}".`);
    }
    return parsed;
  };
}

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
