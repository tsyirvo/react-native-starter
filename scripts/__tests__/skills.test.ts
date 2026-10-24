import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const pinned = 'a'.repeat(40);
const latest = 'b'.repeat(40);
const tagObject = 'c'.repeat(40);
const script = join(process.cwd(), 'scripts/skills.ts');
let directory: string;

const run = (...args: string[]) =>
  spawnSync('bun', [script, ...args], {
    cwd: directory,
    encoding: 'utf8',
    env: { ...process.env, PATH: `${directory}:${process.env.PATH}` },
  });

const executable = (name: string, body: string) =>
  writeFileSync(join(directory, name), `#!${process.execPath}\n${body}`, {
    mode: 0o755,
  });

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), 'skills-maintenance-'));
  writeFileSync(
    join(directory, 'skills-lock.json'),
    JSON.stringify({
      skills: {
        alpha: { ref: pinned, source: 'example/skills', sourceType: 'github' },
        beta: { ref: 'v1.0', source: 'example/skills', sourceType: 'github' },
        gamma: { ref: latest, source: 'other/skills', sourceType: 'github' },
      },
      version: 1,
    }),
  );
  executable(
    'git',
    `console.log('${latest}\\tHEAD\\n${tagObject}\\trefs/tags/v1.0\\n${latest}\\trefs/tags/v1.0^{}');`,
  );
  executable(
    'bunx',
    "require('node:fs').writeFileSync('invocation.json', JSON.stringify({args: process.argv.slice(2), telemetry: process.env.DISABLE_TELEMETRY}));",
  );
});

afterEach(() => {
  rmSync(directory, { force: true, recursive: true });
});

it('reports different and matching revisions, peels annotated tags and leaves the lock unchanged', () => {
  const before = readFileSync(join(directory, 'skills-lock.json'), 'utf8');
  const result = run('check');
  expect(result.status).toBe(0);
  expect(result.stdout).toContain('alpha: upstream HEAD differs');
  expect(result.stdout).toContain('beta: at upstream HEAD');
  expect(result.stdout).toContain('gamma: at upstream HEAD');
  expect(result.stdout).toContain(`/compare/${pinned}...${latest}`);
  expect(readFileSync(join(directory, 'skills-lock.json'), 'utf8')).toBe(
    before,
  );
});

it('fails when upstream cannot be checked instead of reporting freshness', () => {
  executable('git', 'process.exit(1);');
  const result = run('check');
  expect(result.status).toBe(1);
  expect(result.stderr).toContain('check failed');
  expect(result.stdout).not.toContain('at upstream HEAD');
});

it('fails for an unresolved pinned tag', () => {
  executable('git', `console.log('${latest}\\tHEAD');`);
  expect(run('check').stderr).toContain('Cannot resolve pinned tag v1.0');
  expect(run('check').status).toBe(1);
});

it.each([
  ['upgrade'],
  ['upgrade', 'main', 'alpha'],
  ['upgrade', latest],
  ['upgrade', latest, 'unknown'],
  ['upgrade', latest, '--all'],
  ['upgrade', latest, 'alpha', 'gamma'],
  ['check', 'unexpected'],
])('rejects invalid or unscoped input: %j', (...args) => {
  const result = run(...args);
  expect(result.status).toBe(1);
  expect(existsSync(join(directory, 'invocation.json'))).toBe(false);
});

it('delegates only selected skills at an explicit commit with telemetry disabled', () => {
  const result = run('upgrade', latest, 'alpha', 'beta');
  expect(result.status).toBe(0);
  expect(
    JSON.parse(readFileSync(join(directory, 'invocation.json'), 'utf8')),
  ).toEqual({
    args: [
      'skills@1.7.4',
      'add',
      `example/skills#${latest}`,
      '-s',
      'alpha',
      '-s',
      'beta',
      '-a',
      'universal',
      '-y',
    ],
    telemetry: '1',
  });
});

it('propagates installer failures', () => {
  executable('bunx', 'process.exit(9);');
  expect(run('upgrade', latest, 'alpha').status).not.toBe(0);
});
