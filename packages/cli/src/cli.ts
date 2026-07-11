import { runCli } from './run.js';

async function main(): Promise<void> {
  process.exitCode = await runCli(process.argv);
}

void main();
