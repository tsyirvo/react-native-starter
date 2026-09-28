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
    const run = (command: string, ...args: string[]) =>
      execFileSync(command, args, {
        cwd: directory,
        encoding: 'utf8',
        env: {
          ...process.env,
          PATH: `${join(root, 'node_modules', '.bin')}:${process.env.PATH}`,
        },
      }).trim();

    try {
      run('git', 'init', '-q', '-b', 'develop');
      run('git', 'config', 'user.name', 'Release Test');
      run('git', 'config', 'user.email', 'test@example.com');
      writeFileSync(join(directory, '.gitignore'), 'node_modules\n');
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
      run('bun', join(root, 'scripts/prepare-release.ts'), 'minor');
      expect(
        JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8'))
          .version,
      ).toBe('1.1.0');
      run('git', 'add', '.');
      run('git', 'commit', '-qm', 'chore: prepare release');

      writeFileSync(join(directory, 'fix.txt'), 'corrected build');
      run('git', 'add', '.');
      run('git', 'commit', '-qm', 'fix: store review correction');
      run('bun', join(root, 'scripts/prepare-release.ts'));

      const changelog = readFileSync(join(directory, 'CHANGELOG.md'), 'utf8');
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
      run('git', 'commit', '-qm', 'chore: refresh changelog');
      run('bun', join(root, 'scripts/prepare-release.ts'));
      expect(readFileSync(join(directory, 'CHANGELOG.md'), 'utf8')).toBe(
        changelog,
      );
    } finally {
      rmSync(directory, { force: true, recursive: true });
    }
  }, 30_000);
});
