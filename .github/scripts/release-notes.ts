import { execFileSync } from 'node:child_process';

const [, , tag] = process.argv;

if (!(tag && /^v\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(tag))) {
  throw new Error('Expected an existing v-prefixed version tag.');
}

const git = (...args: string[]) =>
  execFileSync('git', args, { encoding: 'utf8' }).trim();

const version = tag.slice(1);
const packageVersion = JSON.parse(git('show', `${tag}:package.json`)).version;

if (packageVersion !== version) {
  throw new Error(`${tag} does not match the version in package.json.`);
}

if (!git('diff', '--name-only', `${tag}^`, tag, '--', 'CHANGELOG.md')) {
  throw new Error(`${tag} does not contain an updated CHANGELOG.md.`);
}

const previousTag = git(
  'describe',
  '--tags',
  '--match',
  'v[0-9]*',
  '--abbrev=0',
  `${tag}^`,
);
const changelog = git('show', `${tag}:CHANGELOG.md`).split('\n');
const start = changelog.findIndex((line) =>
  line.startsWith(`## [${version}](`),
);
const end = changelog.findIndex(
  (line, index) => index > start && line.startsWith('## '),
);
const heading = changelog[start];

if (start === -1 || !heading?.includes(`/compare/${previousTag}...${tag}`)) {
  throw new Error(
    `${tag} has no changelog entry comparing it with ${previousTag}.`,
  );
}

const notes = changelog
  .slice(start, end === -1 ? undefined : end)
  .join('\n')
  .trim();

if (
  !notes
    .split('\n')
    .slice(1)
    .some((line) => line.trim())
) {
  throw new Error(`${tag} has an empty changelog entry.`);
}

console.log(
  `${notes}\n\nSource commit: \`${git('rev-parse', `${tag}^{commit}`)}\``,
);
