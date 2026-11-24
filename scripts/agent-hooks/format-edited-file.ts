import { spawnSync } from 'node:child_process';
import { extname, relative, resolve } from 'node:path';
import { text } from 'node:stream/consumers';

const REPO_ROOT = resolve(import.meta.dirname, '../..');
const CHECKED_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.jsonc']);
// Claude Code shows the stderr of a PostToolUse hook to the agent only on exit code 2.
const REPORT_TO_AGENT_EXIT_CODE = 2;

const parseEditedFilePath = (hookInput: string): string | undefined => {
  const payload: unknown = JSON.parse(hookInput);
  if (typeof payload !== 'object' || payload === null || !('tool_input' in payload)) {
    return;
  }
  const toolInput = payload.tool_input;
  if (typeof toolInput !== 'object' || toolInput === null || !('file_path' in toolInput)) {
    return;
  }
  return typeof toolInput.file_path === 'string' ? toolInput.file_path : undefined;
};

const isCheckedRepoFile = (candidate: string): boolean => {
  const isInsideRepo = !relative(REPO_ROOT, candidate).startsWith('..');
  return isInsideRepo && CHECKED_EXTENSIONS.has(extname(candidate));
};

const editedPath = parseEditedFilePath(await text(process.stdin));
const filePath = editedPath && resolve(REPO_ROOT, editedPath);

if (filePath && isCheckedRepoFile(filePath)) {
  const result = spawnSync(
    'bun',
    [
      'x',
      'biome',
      'check',
      '--write',
      '--files-ignore-unknown=true',
      '--no-errors-on-unmatched',
      filePath,
    ],
    { cwd: REPO_ROOT, encoding: 'utf8' },
  );
  if (result.status !== 0) {
    process.stderr.write(`${result.stdout}${result.stderr}`);
    process.exit(REPORT_TO_AGENT_EXIT_CODE);
  }
}
