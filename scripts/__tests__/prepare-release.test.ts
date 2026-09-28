import { execFileSync } from 'node:child_process';
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

describe('release preparation', () => {
  it('refreshes an untagged candidate without bumping or duplicating changelog entries', () => {
    const root = process.cwd();
    const directory = mkdtempSync(join(tmpdir(), 'release-candidate-'));
    const env = { ...process.env };
    for (const key of Object.keys(env)) {
      if (key.startsWith('GIT_')) {
        delete env[key];
      }
    }
    const run = (command: string, ...args: string[]) =>
      execFileSync(command, args, {
        cwd: directory,
        encoding: 'utf8',
        env: {
          ...env,
          HK: '0',
          PATH: `${join(root, 'node_modules', '.bin')}:${process.env.PATH}`,
        },
      }).trim();

    try {
      run('git', 'init', '-q', '-b', 'develop');
      run('git', 'config', 'user.name', 'Release Test');
      run('git', 'config', 'user.email', 'test@example.com');
      run('git', 'config', 'hook.hk-pre-commit.event', 'pre-commit');
      run('git', 'config', 'hook.hk-pre-commit.command', 'test "$HK" = "0"');
      writeFileSync(join(directory, '.gitignore'), 'node_modules\n');
      writeFileSync(
        join(directory, '.versionrc.json'),
        readFileSync(join(root, '.versionrc.json'), 'utf8'),
      );
      writeFileSync(
        join(directory, 'package.json'),
        JSON.stringify({
          name: 'release-test',
          repository: 'https://github.com/example/release-test',
          version: '1.0.0',
        }),
      );
      writeFileSync(
        join(directory, 'CHANGELOG.md'),
        '# Changelog\n\n## [1.0.0](https://github.com/example/release-test/compare/v0.9.0...v1.0.0)\n\n### Features\n\n* previous release\n',
      );
      symlinkSync(
        join(root, 'node_modules'),
        join(directory, 'node_modules'),
        'dir',
      );
      run('git', 'add', '.');
      run('git', 'commit', '-qm', 'chore: initial release');
      run('git', 'tag', '-a', 'v1.0.0', '-m', 'v1.0.0');

      writeFileSync(join(directory, 'feature.txt'), 'initial feature');
      run('git', 'add', '.');
      run('git', 'commit', '-qm', 'feat: initial feature');
      for (const message of [
        'fix: repair preview',
        'perf: speed launch',
        'fix(security): prevent token leak',
        'chore(deps): update expo',
        'build(deps): update metro',
        'refactor: simplify startup',
        'chore: tidy scripts',
        'test: cover startup',
        'doc: explain release',
      ]) {
        writeFileSync(join(directory, 'changes.txt'), message);
        run('git', 'add', 'changes.txt');
        run('git', 'commit', '-qm', message);
      }
      run('bun', join(root, 'scripts/prepare-release.ts'), 'minor');
      expect(
        JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8'))
          .version,
      ).toBe('1.1.0');
      run('git', 'add', '.');
      run('git', 'commit', '-qm', 'chore(release): prepare release');

      writeFileSync(join(directory, 'fix.txt'), 'corrected build');
      run('git', 'add', '.');
      run('git', 'commit', '-qm', 'fix: store review correction');
      run('bun', join(root, 'scripts/prepare-release.ts'));

      const changelog = readFileSync(join(directory, 'CHANGELOG.md'), 'utf8');
      const [candidate = ''] = changelog.split('## [1.0.0]');
      const section = (name: string) =>
        candidate.split(`### ${name}\n`)[1]?.split('\n### ')[0];
      expect(section('Features')).toContain('initial feature');
      expect(section('Bug Fixes')).toContain('repair preview');
      expect(section('Bug Fixes')).toContain('store review correction');
      expect(section('Bug Fixes')).not.toContain('prevent token leak');
      expect(section('Performance')).toContain('speed launch');
      expect(section('Security')).toContain('prevent token leak');
      expect(section('Dependency Updates')).toContain('update expo');
      expect(section('Dependency Updates')).toContain('update metro');
      expect(section('Other Changes')).toContain('simplify startup');
      expect(section('Other Changes')).toContain('tidy scripts');
      expect(section('Other Changes')).toContain('cover startup');
      expect(section('Other Changes')).toContain('explain release');
      expect(section('Other Changes')).not.toContain('update expo');
      expect(section('Other Changes')).not.toContain('prepare release');
      expect(changelog).toContain('compare/v1.0.0...v1.1.0');
      expect(changelog.match(/## \[1\.1\.0\]/g)).toHaveLength(1);
      expect(changelog.match(/initial feature/g)).toHaveLength(1);
      expect(changelog.match(/store review correction/g)).toHaveLength(1);
      expect(changelog).toContain('previous release');
      expect(
        JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8'))
          .version,
      ).toBe('1.1.0');
      expect(run('git', 'tag', '--list')).toBe('v1.0.0');

      run('git', 'add', 'CHANGELOG.md');
      run('git', 'commit', '-qm', 'chore(release): refresh changelog');
      run('bun', join(root, 'scripts/prepare-release.ts'));
      expect(readFileSync(join(directory, 'CHANGELOG.md'), 'utf8')).toBe(
        changelog,
      );
    } finally {
      rmSync(directory, { force: true, recursive: true });
    }
  }, 30_000);
});
