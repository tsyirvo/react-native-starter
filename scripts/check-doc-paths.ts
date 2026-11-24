import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';

const REPO_ROOT = resolve(import.meta.dirname, '..');
const DOC_PATTERNS = [':(glob)**/AGENTS.md', ':(glob)docs/*.md', ':(glob)docs/rules/*.md'];
const SHARED_RULE_MARKER = 'Shared rule:';
const MODULE_EXTENSIONS = ['', '.ts', '.tsx', '.d.ts'];

const INLINE_CODE = /`(?<span>[^`\n]+)`/gu;
const SCRIPT_RUN =
  /bun run (?:--(?<flag>cwd|filter)[= ](?<value>\S+) )?(?<script>[A-Za-z0-9][\w:.-]*)(?![\w:./-])/gu;
const LINE_SUFFIX = /:\d+$/u;
const NOT_A_PATH = /[{<*:\s]/u;
const URL_ROUTE_PREFIX = '/';
const FOLDER_NAME = /^[^/]+\/$/u;
const JSON_STRING_OR_COMMENT = /(?<quoted>"(?:\\.|[^"\\\n])*")|\/\*[\s\S]*?\*\/|\/\/.*$/gmu;
const TRAILING_COMMA = /,(?<close>\s*[}\]])/gu;
const TRAILING_WILDCARD = /\*$/u;
const TRAILING_SLASH = /\/$/u;

interface Alias {
  prefix: string;
  target: string;
}

interface Package {
  dir: string;
  name: string;
  scripts: Set<string>;
}

interface DocLine {
  doc: string;
  line: number;
  text: string;
}

const listFiles = (patterns: string[]): string[] => {
  const result = spawnSync(
    'git',
    ['ls-files', '--cached', '--others', '--exclude-standard', '--', ...patterns],
    { cwd: REPO_ROOT, encoding: 'utf8' },
  );
  if (result.status !== 0) {
    throw new Error(`git ls-files failed: ${result.stderr}`);
  }
  return result.stdout
    .split('\n')
    .filter((file) => file !== '' && existsSync(join(REPO_ROOT, file)));
};

const repoFiles = listFiles([]);
const repoFolderNames = new Set(repoFiles.flatMap((file) => dirname(file).split('/')));

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const readJson = (path: string): Record<string, unknown> => {
  // A tsconfig.json may hold comments and trailing commas, which JSON.parse rejects.
  const text = readFileSync(join(REPO_ROOT, path), 'utf8')
    .replace(JSON_STRING_OR_COMMENT, (_match, quoted: string | undefined) => quoted ?? '')
    .replace(TRAILING_COMMA, '$<close>');
  const value: unknown = JSON.parse(text);
  return isRecord(value) ? value : {};
};

const readAliases = (tsconfigPath: string): Alias[] => {
  const options = readJson(tsconfigPath).compilerOptions;
  if (!(isRecord(options) && isRecord(options.paths))) {
    return [];
  }
  const base = join(
    dirname(tsconfigPath),
    typeof options.baseUrl === 'string' ? options.baseUrl : '.',
  );
  return Object.entries(options.paths).flatMap(([key, targets]) => {
    const first: unknown = Array.isArray(targets) ? targets[0] : undefined;
    return typeof first === 'string'
      ? [
          {
            prefix: key.replace(TRAILING_WILDCARD, ''),
            target: join(base, first.replace(TRAILING_WILDCARD, '')),
          },
        ]
      : [];
  });
};

const aliases = repoFiles.filter((file) => basename(file) === 'tsconfig.json').flatMap(readAliases);

const readPackage = (manifestPath: string): Package => {
  const { name, scripts } = readJson(manifestPath);
  return {
    dir: dirname(manifestPath),
    name: typeof name === 'string' ? name : '',
    scripts: new Set(isRecord(scripts) ? Object.keys(scripts) : []),
  };
};

const packages = repoFiles.filter((file) => basename(file) === 'package.json').map(readPackage);

const nearestPackage = (dir: string): Package | undefined => {
  const found = packages.find((pkg) => pkg.dir === dir);
  if (found || dir === '.') {
    return found;
  }
  return nearestPackage(dirname(dir));
};

const isSharedRule = (doc: string): boolean =>
  readFileSync(join(REPO_ROOT, doc), 'utf8').split('\n')[2]?.startsWith(SHARED_RULE_MARKER) ??
  false;

const readLines = (doc: string): DocLine[] =>
  readFileSync(join(REPO_ROOT, doc), 'utf8')
    .split('\n')
    .map((text, index) => ({ doc, line: index + 1, text }));

const toDocPath = (codeSpan: string): string | undefined => {
  const path = codeSpan.replace(LINE_SUFFIX, '');
  if (!path.includes('/') || NOT_A_PATH.test(path) || path.startsWith(URL_ROUTE_PREFIX)) {
    return;
  }
  return path;
};

const isExistingModule = (path: string): boolean =>
  MODULE_EXTENSIONS.some((extension) => existsSync(join(REPO_ROOT, `${path}${extension}`)));

// A package import such as "convex/react" resolves in node_modules.
// A layer path such as "domain/ports/" resolves under an alias target, such as the app's src/.
const candidateDirs = (doc: string): string[] => {
  const docDir = dirname(doc);
  const packageDir = nearestPackage(docDir)?.dir;
  const dirs = ['.', docDir, 'node_modules', ...aliases.map((alias) => alias.target)];
  return packageDir ? [...dirs, packageDir, join(packageDir, 'src')] : dirs;
};

const doesPathResolve = ({ doc, path }: { doc: string; path: string }): boolean => {
  // A catch-all alias such as "*" only adds a base folder, through candidateDirs.
  const matching = aliases.filter((alias) => alias.prefix !== '' && path.startsWith(alias.prefix));
  if (matching.length > 0) {
    return matching.some((alias) =>
      isExistingModule(join(alias.target, path.slice(alias.prefix.length))),
    );
  }
  // A scoped package name, such as "@scope/name/sub", is not a repo path.
  if (path.startsWith('@')) {
    return true;
  }
  // A lone "name/" can name a kind of folder, such as "hooks/". It must match a folder in the repo.
  if (FOLDER_NAME.test(path)) {
    return repoFolderNames.has(path.slice(0, -1));
  }
  return candidateDirs(doc).some((dir) => isExistingModule(join(dir, path)));
};

const scriptTargets = ({ doc, flag, value }: { doc: string; flag?: string; value?: string }) => {
  if (flag === 'cwd' && value) {
    return packages.filter((pkg) => pkg.dir === value.replace(TRAILING_SLASH, ''));
  }
  if (flag === 'filter' && value) {
    return packages.filter(
      (pkg) => pkg.name === value || pkg.name.endsWith(`/${value}`) || basename(pkg.dir) === value,
    );
  }
  return [nearestPackage('.'), nearestPackage(dirname(doc))].filter((pkg) => pkg !== undefined);
};

const lineProblems = ({ doc, line, text }: DocLine): string[] => {
  const paths = [...text.matchAll(INLINE_CODE)].flatMap((match) => {
    const path = toDocPath(match.groups?.span ?? '');
    return path && !doesPathResolve({ doc, path })
      ? [`${doc}:${line}: missing path \`${path}\``]
      : [];
  });
  const scripts = [...text.matchAll(SCRIPT_RUN)].flatMap(({ groups }) => {
    const script = groups?.script ?? '';
    return scriptTargets({ doc, flag: groups?.flag, value: groups?.value }).some((pkg) =>
      pkg.scripts.has(script),
    )
      ? []
      : [`${doc}:${line}: unknown script \`bun run ${script}\``];
  });
  return [...paths, ...scripts];
};

const problems = listFiles(DOC_PATTERNS)
  .filter((doc) => !isSharedRule(doc))
  .flatMap(readLines)
  .flatMap(lineProblems);

for (const problem of problems) {
  console.error(problem);
}
if (problems.length > 0) {
  console.error(
    `${problems.length} doc problem(s). Fix the path or the script name, or drop the backticks.`,
  );
}
process.exit(problems.length > 0 ? 1 : 0);
