import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { z } from 'zod';

const COMMIT = /^[a-f0-9]{40}$/u;
const SOURCE = /^[\w.-]+\/[\w.-]+$/u;
const REF = /^[\w./-]+$/u;
const SKILL = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const usage =
  'Usage: skills:check OR skills:upgrade <full-commit-sha> <skill> [skill...]';

const lock = z
  .object({
    skills: z.record(
      z.string().regex(SKILL),
      z.object({
        ref: z.string().regex(REF),
        source: z.string().regex(SOURCE),
        sourceType: z.literal('github'),
      }),
    ),
    version: z.literal(1),
  })
  .parse(JSON.parse(readFileSync('skills-lock.json', 'utf8')));

const reportRevision = (
  name: string,
  entry: (typeof lock.skills)[string],
  refs: Map<string | undefined, string | undefined>,
  head: string,
) => {
  const pinned = COMMIT.test(entry.ref)
    ? entry.ref
    : refs.get(`refs/tags/${entry.ref}^{}`) ||
      refs.get(`refs/tags/${entry.ref}`);
  if (!pinned) {
    throw new Error(`Cannot resolve pinned tag ${entry.ref}.`);
  }
  console.log(
    `${name}: ${pinned === head ? 'at upstream HEAD' : 'upstream HEAD differs'} (${entry.ref} -> ${head})`,
  );
  if (pinned !== head) {
    console.log(
      `  https://github.com/${entry.source}/compare/${entry.ref}...${head}`,
    );
  }
};

const check = () => {
  const sources = new Set(
    Object.values(lock.skills).map((entry) => entry.source),
  );
  for (const source of sources) {
    const skills = Object.entries(lock.skills).filter(
      ([, entry]) => entry.source === source,
    );
    try {
      const patterns = new Set(['HEAD']);
      for (const [, entry] of skills) {
        if (!COMMIT.test(entry.ref)) {
          patterns.add(`refs/tags/${entry.ref}`);
          patterns.add(`refs/tags/${entry.ref}^{}`);
        }
      }
      const output = execFileSync(
        'git',
        ['ls-remote', `https://github.com/${source}.git`, ...patterns],
        {
          encoding: 'utf8',
          env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
          timeout: 30_000,
        },
      );
      const refs = new Map(
        output
          .trim()
          .split('\n')
          .map((line) => {
            const [sha, ref] = line.split('\t');
            return [ref, sha];
          }),
      );
      const head = refs.get('HEAD');
      if (!(head && COMMIT.test(head))) {
        throw new Error('Remote default-branch HEAD is unavailable.');
      }
      for (const [name, entry] of skills) {
        reportRevision(name, entry, refs, head);
      }
    } catch (error) {
      console.error(`${source}: check failed`, error);
      process.exitCode = 1;
    }
  }
  console.log(
    'Read-only revision comparison; differences do not establish ancestry or skill-content changes. Tags stay pinned; review releases separately.',
  );
};

const upgrade = (selection: string[]) => {
  const [commit, ...names] = selection;
  if (!(commit && COMMIT.test(commit) && names.length > 0)) {
    throw new Error(usage);
  }
  const selected = names.map((name) => {
    const entry = Object.hasOwn(lock.skills, name)
      ? lock.skills[name]
      : undefined;
    if (!entry) {
      throw new Error(`Unknown locked skill: ${name}`);
    }
    return entry;
  });
  const source = selected[0]?.source;
  if (!source || selected.some((entry) => entry.source !== source)) {
    throw new Error('Select skills from one source per upgrade.');
  }
  console.log(
    `Installing reviewed commit ${source}#${commit}: ${names.join(', ')}`,
  );
  execFileSync(
    'bunx',
    [
      'skills@1.7.4',
      'add',
      `${source}#${commit}`,
      ...[...new Set(names)].flatMap((name) => ['-s', name]),
      '-a',
      'universal',
      '-y',
    ],
    { env: { ...process.env, DISABLE_TELEMETRY: '1' }, stdio: 'inherit' },
  );
  console.log(
    'Review skill/lockfile diffs, licenses and repository overrides; update provenance and run repository checks. Installation is not atomic; inspect the diff if it fails.',
  );
};

const [operation, ...args] = process.argv.slice(2);
if (operation === 'check' && args.length === 0) {
  check();
} else if (operation === 'upgrade') {
  upgrade(args);
} else {
  throw new Error(usage);
}
