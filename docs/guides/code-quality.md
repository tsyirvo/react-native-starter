# Code quality

This guide covers lint, format and type checks, the git hooks and the
dependency rules.

## Lint, format and type checks

The project uses [Biome](https://biomejs.dev/) with the
[Ultracite](https://github.com/haydenbleasel/ultracite) presets for lint and
format, and [TypeScript](https://www.typescriptlang.org/) for type checks.

| Command                  | What it does                                                                           | Changes files |
| ------------------------ | -------------------------------------------------------------------------------------- | ------------- |
| `bun run check`          | Biome lint and format checks                                                           | No            |
| `bun run check:fix`      | Applies Biome fixes and sorts imports                                                  | Yes           |
| `bun run typecheck`      | Type checks with TypeScript                                                            | No            |
| `bun run test`           | Runs every test suite. It takes no arguments.                                          | No            |
| `bun run test:related`   | Runs the tests related to the paths it gets. It passes when no test is related.        | No            |
| `bun run verify`         | Runs `check`, `typecheck` and `test` in parallel. CI runs it in one job.               | No            |
| `bun run verify:changed` | Runs `check`, `typecheck`, then `test:related` on the files changed since origin/HEAD. | No            |

Use `bun run check:fix` only when you want its fixes. Then check the diff.

### Biome configuration

Three files configure Biome:

- `biome.base.jsonc` holds the formatting and the rule levels: 100 columns,
  single quotes, trailing commas and the Ultracite presets, plus rules for
  promises, type assertions, switch cases, naming and tests. Do not edit it in
  this repository.
- `biome.jsonc` extends the base and `biome.debt.jsonc`. It holds only what
  this repository needs: ignores, import boundaries and overrides.
- `biome.debt.jsonc` lists, rule by rule, the files that break a rule today.
  Biome reports them as warnings, so `bun run check` passes and the debt stays
  visible. A new file gets the full rule set.

Follow these rules when you change the configuration:

- Put repository rules in `biome.jsonc` as overrides: import boundaries,
  component options, or a rule that is off for one folder, with the reason.
- Never add a path to `biome.debt.jsonc`. When you change a listed file, fix
  that rule in the file, then remove the path. Remove a rule entry when its list
  is empty.
- Treat a Biome warning as debt to remove, not as noise.

Project-specific exceptions:

- **File names:** components use PascalCase. Other files use camelCase.
  Package-named mocks, type augmentations and CLI scripts can also use
  kebab-case.
- **Routes:** files in `src/app/` must use kebab-case, because Expo Router uses
  them as URL segments.
- **JSX:** inline JSX callbacks are permitted.
- **Labels:** `noLabelWithoutControl` is off, because React Native has no
  label/control association and the rule flags non-form `Label` components.
- **YAML and Markdown:** Biome formats both.

## Git hooks

[hk](https://hk.jdx.dev/) manages the git hooks. `mise install` installs them
for you: `bun install` runs the `prepare` script, which runs
`scripts/install-git-hooks.sh`. The script does nothing in CI. To install them
again, run:

```sh
bun run hooks:install
```

`hk.pkl` declares all the hooks.

### pre-commit

This hook checks only the staged files, so it runs in a few seconds.

1. hk stashes your unstaged changes.
2. Biome fixes the staged files and stages its fixes again.
3. `bun run typecheck` checks the types of the whole project, and Jest runs the
   related tests, on the fixed files.
4. [Gitleaks](https://github.com/gitleaks/gitleaks) scans all the staged
   changes, including non-code files. If it finds a secret, it stops the commit
   and shows the finding with the secret hidden.

Steps that change the same file use a lock, so two tools never write to a file
at the same time. `hk fix` runs the same steps, but it does not stage the
fixes.

If Gitleaks finds a false positive, add its fingerprint to a `.gitleaksignore`
file at the repository root. To skip Gitleaks one time, run
`HK_SKIP_STEPS=gitleaks git commit`.

### commit-msg

This hook checks that the commit message uses the
[conventional commit](https://www.conventionalcommits.org/) format. The release
workflow uses these messages to make the changelog. Read
[Releasing](releasing.md).

### pre-push

This hook checks the full repository. The pre-commit hook does not check files
that the commit did not change, so it can miss some errors.

- `bun run check` and `bun run typecheck` run in parallel.
- This hook does not run the tests. CI runs them. To run them yourself, use
  `bun run test`.

To run the same checks manually, use `bun run check` and `bun run typecheck`.

### post-checkout

This hook runs when you check out a branch. `git worktree add` also runs it, in
the new worktree.

Doppler keeps its setup for each directory and its subdirectories. Thus, a
worktree outside the main checkout does not have a setup. The hook runs `scripts/setup-doppler.sh`. This script runs
`doppler setup` with the project and the config from `doppler.yaml`.

- If the directory already has a Doppler setup, the script does nothing.
- If the Doppler CLI is not installed, the script does nothing.
- If `doppler setup` fails, the script shows a warning. The checkout does not
  fail. Run `doppler login`, then `doppler setup`.

If you cloned the repository before this hook existed, run
`bun run hooks:install` one time.

### Skip a hook

- To skip all hooks for one command, use `git commit --no-verify`.
- To skip one step, use `HK_SKIP_STEPS=<step>`, for example
  `HK_SKIP_STEPS=test git commit`.

## Dependency age

`bunfig.toml` sets a `minimumReleaseAge` of 3 days. `bun install`, `bun add`
and `bunx expo install` only use package versions that are at least 3 days old.
Dependabot uses the same 3-day delay for GitHub Actions.

To use a newer version that you checked, for example a security fix, add it to
`minimumReleaseAgeExcludes` as `name@version`.
