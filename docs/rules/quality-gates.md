# Quality gates

Shared rule: it comes from a shared source, so do not edit it in this repo. Repo rules live in the files that `docs/rules/README.md` lists.

## Scripts

Run them from the repo root.

| Script           | Meaning                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `check`          | Every static check that does not need the type checker: Biome, Knip, dependency-cruiser. No write. |
| `check:fix`      | `biome check --write` on the whole repo. It writes files: read the diff.                           |
| `typecheck`      | Every TypeScript project in the repo.                                                              |
| `test`           | Every test suite. It takes no arguments.                                                           |
| `test:related`   | The tests related to the files it gets, as paths from the repo root.                               |
| `verify`         | `check`, `typecheck` and `test`. CI runs it. A change is done when it exits 0.                     |
| `verify:changed` | `check`, `typecheck`, then `test:related` on the files changed since `origin/HEAD`.                |

Use `verify:changed` and `test:related` while you work, and `verify` before you hand off. Report each check that you could not run, with the reason. Missing output is not a pass.

## Shared base configs

Some config files come from a shared source. Do not edit them in this repo: `biome.base.jsonc`, `depcruise.base.mjs`, `jest.base.mjs` and `hk.pkl`. A repo rule goes in the repo file that extends the base: `biome.jsonc`, `depcruise.config.mjs` or `jest.config.mjs`.

## Debt files

Three files list the violations of the day each tool came in: `biome.debt.jsonc`, `knip.debt.ts` and `depcruise.debt.json`.

- Never add an entry. A new file has no debt.
- When you change a file that a debt file lists, fix that violation in the file, then remove its entry. `bun run depcruise:debt` removes the fixed dependency-cruiser entries.
- A Biome warning is debt. No rule is at `warn` outside `biome.debt.jsonc`.

## Biome

- Repo rules go in `biome.jsonc` as overrides: import boundaries, the options a folder needs, and a rule turned off for one folder where it cannot apply, with a one-line reason.
- Do not silence a new error with `biome-ignore`. The exception is a signature that a library sets: the comment names the library.
- `.git-blame-ignore-revs` lists the commits that only apply Biome fixes. Run `git config blame.ignoreRevsFile .git-blame-ignore-revs` once to skip them locally.

## Knip

- `bun run knip` fails on unused files, exports, types and dependencies.
- A test, a story or a Jest mock counts as a use.
- Add an `ignore` entry in `knip.config.ts` only for a file that a tool loads by a path Knip cannot see, with its reason.

## dependency-cruiser

`bun run depcruise` fails on:

- an import cycle, also through type imports;
- an orphan: a module that imports nothing and that nothing imports;
- an import that does not resolve, with the `.ios` and `.native` files that Metro picks;
- a package that the nearest `package.json` does not list, lists twice, or lists only as a peer or optional dependency;
- a package from `devDependencies` in shipped code, outside tests, mocks, stories and config files. A type-only import is allowed;
- an import of a test file, a deprecated package or a deprecated Node module.

When a tool loads a file by name, so that it looks like an orphan, override `no-orphans` in `depcruise.config.mjs`. Spread `ORPHAN_PATH_NOT` from the base into `pathNot`, then add the path with its reason.

## Git hooks

`hk.pkl` defines the hooks. `bun install` installs them when `mise` is on `PATH` and `CI` is not set.

| Hook            | Checks                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| `commit-msg`    | Conventional Commits format                                                                              |
| `pre-commit`    | Biome on staged files, with fixes staged; the full `typecheck`; `test:related` on staged files; Gitleaks |
| `pre-push`      | `check` and `typecheck`                                                                                  |
| `post-checkout` | `scripts/setup-doppler.sh` connects a new worktree to Doppler                                            |

The pre-commit typecheck covers every project, because a changed export can break a file that is not staged. When a hook fails, fix the cause and commit again. When Gitleaks flags a false positive, add its fingerprint to `.gitleaksignore`.

## Enforcement

`bun run verify`, the hooks and CI enforce each gate in this file.
