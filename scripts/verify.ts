import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

interface Gate {
  args: readonly string[];
  script: string;
}

interface Result {
  gate: Gate;
  ok: boolean;
  output: string;
  seconds: number;
}

const ROOT = join(import.meta.dirname, '..');
const LOG_DIR = join(ROOT, 'node_modules', '.cache', 'verify');
const TAIL_LINES = 40;
const IN_CI = Boolean(process.env.CI);

const write = (text: string) => process.stdout.write(`${text}\n`);

const gitLines = (args: readonly string[]): string[] => {
  const result = spawnSync('git', args, { cwd: ROOT, encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(`git ${args.join(' ')} failed: ${result.stderr.trim()}`);
  }
  return result.stdout.split('\n').filter(Boolean);
};

const changedFiles = (): string[] => {
  const [base] = gitLines(['merge-base', 'HEAD', 'origin/HEAD']);
  if (!base) {
    throw new Error(
      'No merge base with origin/HEAD. Run: git remote set-head origin --auto',
    );
  }
  const files = [
    ...gitLines(['diff', '--name-only', '--diff-filter=d', base]),
    ...gitLines(['ls-files', '--others', '--exclude-standard']),
  ];
  return [...new Set(files)].filter((file) => existsSync(join(ROOT, file)));
};

const gatesFor = (changed: boolean): Gate[] => {
  const shared = [
    { args: [], script: 'check' },
    { args: [], script: 'typecheck' },
  ];
  if (!changed) {
    return [...shared, { args: [], script: 'test' }];
  }
  const files = changedFiles();
  if (files.length === 0) {
    write('No changed files: test:related skipped.');
    return shared;
  }
  return [...shared, { args: files, script: 'test:related' }];
};

const run = (gate: Gate): Promise<Result> =>
  new Promise((resolve) => {
    const start = performance.now();
    const chunks: Buffer[] = [];
    const child = spawn('bun', ['run', gate.script, ...gate.args], {
      cwd: ROOT,
    });
    child.stdout.on('data', (chunk: Buffer) => chunks.push(chunk));
    child.stderr.on('data', (chunk: Buffer) => chunks.push(chunk));
    child.on('close', (code) => {
      resolve({
        gate,
        ok: code === 0,
        output: Buffer.concat(chunks).toString('utf8').trimEnd(),
        seconds: (performance.now() - start) / 1000,
      });
    });
  });

const label = (result: Result) =>
  `${result.ok ? 'ok  ' : 'FAIL'}  ${result.gate.script.padEnd(12)} ${result.seconds.toFixed(1)}s`;

const reportCi = (result: Result) => {
  if (result.ok) {
    write(`::group::${label(result)}`);
    write(result.output);
    write('::endgroup::');
    return;
  }
  write(label(result));
  write(result.output);
};

const reportLocal = (result: Result) => {
  if (result.ok) {
    write(label(result));
    return;
  }
  mkdirSync(LOG_DIR, { recursive: true });
  const logPath = join(LOG_DIR, `${result.gate.script.replace(':', '-')}.log`);
  writeFileSync(logPath, `${result.output}\n`);
  write(`${label(result)}  full log: ${relative(ROOT, logPath)}`);
  const tail = result.output.split('\n').slice(-TAIL_LINES);
  write(tail.map((line) => `    ${line}`).join('\n'));
};

const report = IN_CI ? reportCi : reportLocal;
const gates = gatesFor(process.argv.includes('--changed'));
const results = await Promise.all(
  gates.map(async (gate) => {
    const result = await run(gate);
    report(result);
    return result;
  }),
);
const failed = results
  .filter((result) => !result.ok)
  .map((result) => result.gate.script);

write(
  failed.length === 0 ? 'verify: ok' : `verify: FAIL (${failed.join(', ')})`,
);
process.exit(failed.length === 0 ? 0 : 1);
