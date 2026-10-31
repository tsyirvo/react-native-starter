# Code quality

This guide covers lint, format and type checks, the git hooks and the
dependency rules.

## Lint, format and type checks

The project uses [Biome](https://biomejs.dev/) with the
[Ultracite](https://github.com/haydenbleasel/ultracite) presets for lint and
format, and [TypeScript](https://www.typescriptlang.org/) for type checks.

| Command                | What it does                         | Changes files |
| ---------------------- | ------------------------------------ | ------------- |
| `bun run lint:ts`      | Type checks with TypeScript          | No            |
| `bun run lint:ci`      | Lint and format checks               | No            |
| `bun run format:check` | Format checks only                   | No            |
| `bun run lint`         | Applies safe fixes and sorts imports | Yes           |
| `bun run format`       | Formats the files                    | Yes           |

Use the commands that change files only when you want their fixes. Then check
the diff.

### Biome configuration

`biome.jsonc` extends the Ultracite core and React presets, and keeps their
defaults. These defaults include a check for undeclared dependencies.
`biome.jsonc` also documents each project-specific exception.

- **File names:** components use PascalCase. Other files use camelCase.
  Package-named mocks, type augmentations and CLI scripts can also use
  kebab-case.
- **Routes:** files in `src/app/` must use kebab-case, because Expo Router uses
  them as URL segments.
- **JSX:** inline JSX callbacks are permitted.
- **Classes:** methods are not required to use `this`, because infra adapters
  are stateless classes.
- **Labels:** `noLabelWithoutControl` is off, because React Native has no
  label/control association and the rule flags non-form `Label` components.
- **YAML:** Biome formats YAML files.
- **Markdown:** Biome lints Markdown and reads skill frontmatter. Biome does not
  format Markdown, because Biome 2.6 does not support the GFM tables and task
  lists in this repository.

## Git hooks

[hk](https://hk.jdx.dev/) manages the git hooks. `mise install` installs them
for you, through the `[hooks] postinstall` entry in `mise.toml`. To install
them again, run:

```sh
bun run hooks:install
```

`hk.pkl` declares all the hooks.

### pre-commit

This hook checks only the staged files, so it runs in a few seconds.

1. hk stashes your unstaged changes.
2. Biome fixes the staged files and stages its fixes again.
3. `tsc-files` checks the types, and Jest runs the related tests, on the fixed
   files.
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

- Biome and TypeScript run in parallel.
- The full test suite starts after them. A lint or type error shows in a few
  seconds, before the tests start.

To run the same checks manually, use `hk check --all` or
`bun run hooks:check`.

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
