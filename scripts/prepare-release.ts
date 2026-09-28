import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import semver from 'semver';

const RELEASE_HEADING = /^## /m;

const git = (...args: string[]) =>
  execFileSync('git', args, { encoding: 'utf8' }).trim();

const runStandardVersion = (...args: string[]) =>
  execFileSync(
    'bunx',
    ['standard-version', ...args, '--skip.commit', '--skip.tag'],
    { stdio: 'inherit' },
  );

const splitChangelog = (content: string) => {
  const start = content.search(RELEASE_HEADING);
  if (start === -1) {
    throw new Error('CHANGELOG.md has no release entry.');
  }

  const next = content.slice(start + 1).search(RELEASE_HEADING);
  const end = next === -1 ? content.length : start + 1 + next;
  return {
    entry: content.slice(start, end),
    header: content.slice(0, start),
    older: content.slice(end),
  };
};

const [, , argument] = process.argv;

if (git('status', '--porcelain')) {
  throw new Error('Commit or stash your changes before preparing a release.');
}

const previousTag = git(
  'describe',
  '--tags',
  '--match',
  'v[0-9]*',
  '--abbrev=0',
);
const currentVersion = JSON.parse(readFileSync('package.json', 'utf8')).version;

if (currentVersion === previousTag.slice(1)) {
  let releaseType = argument;

  if (!releaseType) {
    if (!stdin.isTTY) {
      throw new Error(
        'Pass major, minor, or patch when running non-interactively.',
      );
    }

    const prompt = createInterface({ input: stdin, output: stdout });
    try {
      releaseType = (
        await prompt.question('Release type (major/minor/patch): ')
      ).trim();
    } finally {
      prompt.close();
    }
  }

  if (!['major', 'minor', 'patch'].includes(releaseType)) {
    throw new Error('Release type must be major, minor, or patch.');
  }

  runStandardVersion('--release-as', releaseType);
} else {
  const tag = `v${currentVersion}`;
  if (
    argument ||
    !semver.gt(currentVersion, previousTag.slice(1)) ||
    git('tag', '--list', tag)
  ) {
    throw new Error(
      'Expected an untagged release candidate; rerun without a release type.',
    );
  }

  const changelog = splitChangelog(readFileSync('CHANGELOG.md', 'utf8'));
  const [heading] = changelog.entry.split('\n');
  if (
    !(
      heading?.startsWith(`## [${currentVersion}](`) &&
      heading.includes(`/compare/${previousTag}...${tag}`)
    )
  ) {
    throw new Error(
      `CHANGELOG.md must start with the unreleased ${tag} entry.`,
    );
  }

  const directory = mkdtempSync(join(tmpdir(), 'release-changelog-'));
  try {
    const infile = join(directory, 'CHANGELOG.md');
    runStandardVersion('--skip.bump', '--infile', infile);
    const updated = splitChangelog(readFileSync(infile, 'utf8'));
    const [updatedHeading] = updated.entry.split('\n');
    if (
      !(
        updatedHeading?.startsWith(`## [${currentVersion}](`) &&
        updatedHeading.includes(`/compare/${previousTag}...${tag}`)
      )
    ) {
      throw new Error(`Could not regenerate the ${tag} changelog entry.`);
    }

    writeFileSync(
      'CHANGELOG.md',
      changelog.header + updated.entry + changelog.older,
    );
  } finally {
    rmSync(directory, { force: true, recursive: true });
  }
}

console.log(
  'Review and commit package.json and CHANGELOG.md before building the release candidate.',
);
