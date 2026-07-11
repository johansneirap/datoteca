import { Command, Option } from 'commander';
import { Datoteca } from '@datoteca/cl';
import { withCommonOptions, parseNumberFlag } from '../options.js';
import { serializeRows } from '../format.js';
import type { CommonOptions, Io, Row } from '../types.js';

type Currency = 'CLP' | 'UF';

interface MoneyCliOptions extends CommonOptions {
  currency: Currency;
  min?: number;
  max?: number;
}

const CLP_FORMATTER = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

const UF_FORMATTER = new Intl.NumberFormat('es-CL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function registerMoneyCommand(program: Command, io: Io): void {
  const command = withCommonOptions(
    program.command('money').description('Genera montos en CLP o UF'),
  );

  command
    .addOption(
      new Option('--currency <currency>', 'moneda a generar').choices(['CLP', 'UF']).default('CLP'),
    )
    .option('--min <min>', 'monto mínimo del rango', parseNumberFlag('--min'))
    .option('--max <max>', 'monto máximo del rango', parseNumberFlag('--max'))
    .action((options: MoneyCliOptions) => {
      if (options.min !== undefined && options.max !== undefined && options.min > options.max) {
        // command.error() escribe a stderr vía configureOutput y luego lanza (exitOverride);
        // lanzar InvalidArgumentError directamente aquí NO pasaría por esa escritura.
        command.error(`--min (${options.min}) no puede ser mayor que --max (${options.max}).`, {
          code: 'commander.invalidArgument',
          exitCode: 1,
        });
      }

      const dl = new Datoteca({ seed: options.seed });
      const range = { min: options.min, max: options.max };

      // dinero.clp()/uf() vuelven a consumir el RNG internamente (llaman a su propio
      // *Numero()), así que llamar a ambos por separado desincronizaría el monto
      // formateado del numérico. Se llama solo a *Numero() y se formatea localmente.
      const rows: Row[] = Array.from({ length: options.count }, (): Row => {
        if (options.currency === 'UF') {
          const amount = dl.dinero.ufNumero(range);
          return { currency: 'UF', amount, formatted: `UF ${UF_FORMATTER.format(amount)}` };
        }
        const amount = dl.dinero.clpNumero(range);
        return { currency: 'CLP', amount, formatted: CLP_FORMATTER.format(amount) };
      });

      io.stdout(serializeRows(rows, options.format) + '\n');
    });
}
