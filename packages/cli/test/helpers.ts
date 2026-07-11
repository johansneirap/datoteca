import { runCli } from '../src/run.js';
import type { Io } from '../src/types.js';

export interface InvokeResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export async function invoke(args: string[]): Promise<InvokeResult> {
  let stdout = '';
  let stderr = '';
  const io: Io = {
    stdout: (chunk) => {
      stdout += chunk;
    },
    stderr: (chunk) => {
      stderr += chunk;
    },
  };

  const exitCode = await runCli(['node', 'datoteca', ...args], io);
  return { exitCode, stdout, stderr };
}
