# React Native Starter

- [React Native Starter](#react-native-starter)
  - [Explanations](#explanations)
  - [Architecture](#architecture)
  - [AI coding agents](#ai-coding-agents)
  - [The setup](#the-setup)
  - [Runing the project](#runing-the-project)
  - [Stack](#stack)
  - [Configure the tooling](#configure-the-tooling)
  - [Environments](#environments)
  - [Internationalization](#internationalization)
  - [Using Storybook](#using-storybook)
  - [Tests](#tests)
  - [Formatting and type checking](#formatting-and-type-checking)
  - [Github Actions](#github-actions)

---

## Explanations

This starter is the one I use for my personal projects and some of my client work.

It's a basic start, but with most of the common dependencies and tools I usually setup in new projects, so that I can bootstrap a new one more easily.

The goal is not to provide a ton of UI elements, tools and so on, but rather the most frequent tools/libraries that I end up using. In most starter kit I found, there are too many things already builtin that end up unused so this one is a lighter version focused on providing the essentials, mostly on the tooling side rather than on UI elements.

Check the [React Native docs](https://reactnative.dev/docs/environment-setup) on how to properly setup your dev environment. It uses Expo with a custom Development Build, so you also need to setup [Expo tooling](https://docs.expo.dev/).

## Architecture

This is a lightweight, opinionated starter, not a prebuilt product architecture. Auth, billing and other common published-app integrations are configured by default; app-specific product concepts are not prefilled. Keep code with its current owner:

| Directory          | Responsibility                                                                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/`         | Thin Expo Router routes and navigation composition. Files here are routes; do not add unrelated configuration files.                                           |
| `src/application/` | App-wide workflows such as demo auth, startup, availability/update policy and instrumentation (`auth/`, `bootstrap/`, `appAvailability/`, `instrumentation/`). |
| `src/features/`    | User-facing flows and their UI/policy, including small features like `storeRating/`.                                                                           |
| `src/infra/`       | Concrete SDK integrations, storage, API scaffolding and runtime configuration.                                                                                 |
| `src/shared/`      | Reusable UI, theme, hooks and utilities, not app-wide or feature-specific policy.                                                                              |
| `src/assets/`      | Runtime UI assets (images and future media/animation files), consumed only through the `Assets` entry point.                                                   |
| `src/domain/`      | Pure models and rules, currently the user types and subscription entitlement check.                                                                            |
| `src/testing/`     | Jest setup and React Native Testing Library helpers.                                                                                                           |

Examples from the current code:

- `src/app/(protected)/(tabs)/(home)/index.tsx` imports `Header`, `Informations` and `Version` from `$features/home`, plus `Screen` from `$shared/components`.
- `src/application/auth/contexts/authContext/AuthContextProvider.tsx` imports the domain `User` type from `$domain/entities` and calls the concrete `$infra/purchase` adapter during the auth workflow.
- `src/features/notifications/hooks/useRequestPermission.ts` calls `$infra/permissions` and `$infra/toaster` for a user-facing permission flow.

Keep `domain` independent of React, Expo, infra and shared. Infra may import domain types and pure rules. Shared should not import application or features; keep feature-specific UI and policy in its feature even when reused within one screen. Features may consume application workflows (e.g. `features/subscription` reads the auth user and purchase identity readiness from `$application/auth`), but application must not import features; routes in `app/` compose both. Application modules compose workflows and may call concrete infra adapters: this is a pragmatic exception to strict inward-only Clean Architecture, not a mandate to add a port for every SDK.

Auth owns purchase identity transitions and serializes login/logout calls. Subscription waits for `isPurchaseUserReady` before reading entitlements or listening for customer updates, and ignores results from an obsolete user. Purchase SDK failures are logged but do not prevent local sign-out. App availability, maintenance and store-update policy live in `application/appAvailability` rather than shared UI.

Start with one local implementation. Introduce a seam or port only when multiple adapters, complex test setup or repeated policy justify it. Add app-specific domain concepts and richer workflows as the consuming app grows rather than pre-filling them here. The sign-in is **demo-only**; session restoration and token refresh are placeholders, and no backend/API client is wired up. Do not treat this as production authentication.

### Folder organization

Within a module, group different roles under `components/`, `contexts/`, `hooks/`, `utils/`, `constants/` and `types/`; create only the folders needed. `application/appAvailability/` is the reference for component-and-hook modules.

- Keep context definitions and providers together in `contexts/<contextName>/`, with consumer hooks in the module's `hooks/` folder and standalone helpers in `utils/`.
- Use a flat `components/` folder for simple components. A named component subfolder can group its implementation, tests, stories and supporting files.
- Colocate `__tests__/` and `stories/` with their owning component, context, hook or utility.
- Leaf component packages such as `shared/uiKit/input/` may keep their primary component at the package root, with supporting components, hooks and utilities in subfolders. Simple SDK adapters may similarly keep their implementation and associated types together.
- Use local `index.ts` barrels for components, hooks and utilities consumed outside their folder. Keep module-root exports limited to the intended public API; internal code should not import its own module-root barrel. Context definitions and initialization-sensitive dependencies may use direct imports.
- Do not add these role folders under `src/app/`, where files define routes, or edit generated files such as the icon font in `shared/icons/font/`.
- Consume image and media assets through the `$assets` `Assets` entry point (`Assets.images.<group>...`), not direct file imports. Register assets with lazy getters mirroring the `components`/`screens`/`shared` folder structure, read the value where the component renders it, and remove entries of unused assets. SVG icons (`shared/icons/`) stay outside `Assets`: they are compiled into an icon font and rendered with the `Icon` component.

Check changes with `bun run lint:ts`, `bun run lint:ci`, `bun run format:check` and `bun run test`. Use `bun run lint` and `bun run format` only when you want their auto-fixes.

## AI coding agents

Use any coding agent with shared instructions in [AGENTS.md](AGENTS.md), focused
[project guides](docs/agents/rules/architecture.md), and versioned
[Agent Skills](.agents/README.md). Client-specific files are optional
compatibility adapters, not separate rule sets or a restriction on agent choice.

See [agent setup](docs/agents/README.md) for adapting instruction, skill and MCP
discovery to your chosen agent, with optional client examples. Root `.mcp.json`
provides Context7, Expo and local `agent-device` (simulator/emulator automation)
definitions; translate them to your client's format if needed. Sentry is an optional example. Credentials and personal settings
stay local, and external writes require approval. No AI tooling is added to
app dependencies; the `agent-device` CLI is pinned in `mise.toml`.

## What's included

On the Developer Experience side, a test stack is setup (unit, functional and E2E), a CI on _Github Actions_, a _Storybook_, _TypeScript_ is also configured with _Biome_ (based on the _Ultracite_ presets). Commits are linted to automate the release workflows and the changelog generation.

There are also some utilities like:

- Compiling `.svg` icons into a typed icon font with [react-native-nano-icons](https://github.com/software-mansion-labs/react-native-nano-icons), rendered as a single native view per icon
- Git hooks managed by [hk](https://hk.jdx.dev/): a fast pre-commit on staged files with Gitleaks secret scanning, a full pre-push safety net
- Tooling to release and tag new versions

On the features side, there are already some things to get started quickly with any project:

- A data fetching and caching layer with TanStack Query
- Form validation with Keyboard handling
- App Store rating prompt
- Feature Flags
- Error monitoring
- Analytics
- In-app purchases
- Attribution
- Dates manipulation

There are a few other things setup which you can discover on your own ;)

## The setup

The toolchain (Node, Bun, EAS CLI) is managed by [mise](https://mise.jdx.dev/), so everyone works with the supported versions locally. Install mise, then from the repo root:

```sh
mise trust
mise install
```

`mise install` reads the `[tools]` section of `mise.toml` and installs what's missing, but it does not change the `PATH` of the current shell. For that you need mise's [shell activation hook](https://mise.jdx.dev/getting-started.html#activate-mise), which puts the right `node` and `bun` on your `PATH` as soon as you enter the directory.

Then install the packages:

```sh
bun install
```

Without the activation hook, prefix the commands with `mise exec --` (e.g. `mise exec -- bun install`) so they run against the versions from `mise.toml`.

If you'd rather not use mise, the project only requires Node >= 26 and Bun >= 1.4.4, and every task below has a plain `bun run` equivalent. mise pins Bun 1.4.4 and CI follows the latest Bun 1.4.x release.

`bunfig.toml` sets a 3-day `minimumReleaseAge`: `bun install`, `bun add` and `bunx expo install` only resolve package versions published at least 3 days ago, matching the Dependabot cooldown for GitHub Actions. To take a vetted newer version early (a security fix, for example), add it to `minimumReleaseAgeExcludes` as `name@version`.

## Tasks with mise

Beyond tooling versions, `mise.toml` also declares tasks for the common workflows. They are thin wrappers around the `package.json` scripts, so both entry points stay in sync.

List everything available with:

```sh
mise tasks
```

Run one with `mise run <task>` (or just `mise <task>`), using the short alias when there is one:

```sh
mise run check:fix     # or: mise cf
mise run typecheck     # or: mise tc
mise run test          # or: mise t
```

The tasks are grouped as follows:

- **Quality** — `lint`, `lint:fix`, `format`, `format:fix`, `check`, `check:fix`, `check:ci`, `typecheck`, and `fix` which chains the auto-fixing ones
- **Tests** — `test`, `test:coverage`, `test:e2e`, and `ci` which chains `typecheck`, `check:ci` and `test` (what the _Quality_ workflow runs)
- **App** — `start`, `start:staging`, `start:production`, `storybook`, `storybook:generate`
- **Builds** — the local EAS builds, e.g. `build:dev:ios`, `build:stg:android`, `build:prod:ios`
- **Git hooks** — `hooks:install`, `hooks:check` (or `mise hc`), `hooks:fix` (or `mise hf`), `hooks:pre-commit` and `hooks:pre-push` to run a hook manually
- **Utilities** — `install`, `generate:icons`, `doctor`, `clean`

Tasks declared with `depends` run their dependencies first, and in parallel when they are independent. The auto-fixing ones chained by `fix` are the exception: they run one after the other since they all write to the same files.

## Runing the project

The SDKs require configuration. [`.env.example`](.env.example) lists the required variables; it is documentation only, not a runtime file. Install the [Doppler CLI](https://docs.doppler.com/docs/install-cli), log in, and run `doppler setup` to select your project. Populate its `dev`, `stg`, and `prd` configs before running the matching scripts. If your Doppler config names differ, update the `--config` arguments in `package.json` and the development build workflow.

To launch the React Native packager:

```sh
bun run start:dev
# or
bun run start:staging
# or
bun run start:production
```

then, for the matching environment and platform:

```sh
bun run build:dev:ios
bun run build:dev:android
bun run build:stg:ios
bun run build:stg:android
bun run build:prod:ios
bun run build:prod:android
```

You will then be able to boot an iOS simulator or Android emulator, if installed on your machine.

## Stack

The most useful libraries already configured are the following:

[React Native](https://facebook.github.io/react-native/) with [Expo](https://docs.expo.dev/)

[Expo Router](https://docs.expo.dev/router/introduction/) for the routing

[Sentry](https://sentry.io/welcome/) for crash reporting

[Unistyles](https://www.unistyl.es/) for the styling

[i18next](https://www.i18next.com/) for the internationalization

[TanStack Query](https://tanstack.com/query/latest) on the API side

[PostHog](https://www.flagsmith.com/) for analytics and feature flags

[Legend State](https://www.legendapp.com/open-source/state/v3/) for a global store

[RevenueCat](https://www.revenuecat.com/) for in-app purchases

A few other interesting things are configured, don't hesitate to look around.

## Configure the tooling

Some tools are installed in the project, but you'll need to add your API keys and secrets to have them work properly. Check the documentation of each of those libraries on how to do this.

If you don't do this, the app won't launch at all. The CLI will tell you if one or more required environement variable is not set.

The services requiring configuration are listed in `.env.example`:

- Expo
- Sentry
- PostHog
- RevenueCat

## Environments

Doppler is the source of truth; there are no runtime `.env` files to maintain or generate. Keep environment-specific values, including `APP_NAME`, in Doppler. The scripts select the Doppler config and set `APP_ENV` explicitly; EAS profiles set the same app variant on remote builders.

| App environment | Doppler config | EAS environment | EAS build profiles                  |
| --------------- | -------------- | --------------- | ----------------------------------- |
| Development     | `dev`          | `development`   | `development`, `development-device` |
| Staging         | `stg`          | `preview`       | `staging`                           |
| Production      | `prd`          | `production`    | `production`                        |

`env.js` validates the injected values and rejects missing or empty required variables. `app.config.ts` consumes those values and exposes only `ClientEnv` through `extra`; build credentials such as `SENTRY_AUTH_TOKEN` are not included in the client configuration. `APP_ENV` also controls bundle/package suffixes and production-only updates. `NODE_ENV` does not select the app variant.

Do not copy `.env.example` to `.env`. Runtime environment files are gitignored, and `EXPO_NO_DOTENV=1` disables Expo's file loading in app commands and EAS profiles. Bun has its own automatic dotenv loading, so remove old local `.env` files when migrating to this workflow.

### Syncing Doppler to EAS for cloud builds

Local `doppler run` injection is not forwarded automatically to remote builders. Before the first cloud build, and whenever values change, push each app's Doppler config to the corresponding **project-level** EAS environment. Authenticate with EAS (`eas login`, or `EXPO_TOKEN` in CI), then run the following from the repository root for development:

```sh
doppler run --config dev -- env APP_ENV=development EXPO_NO_DOTENV=1 \
  doppler run --config dev --mount .env.eas-sync --format env -- \
  eas env:push development --path .env.eas-sync --force
```

For staging, change **both** `--config dev` arguments to `--config stg`, set `APP_ENV=staging`, and use `eas env:push preview`. For production, use `--config prd`, `APP_ENV=production`, and `eas env:push production`.

The outer Doppler command supplies values needed for EAS CLI's initial `app.config.ts` resolution. The inner command mounts a temporary dotenv named pipe for `env:push`; Doppler removes it when the command exits, without persisting a plaintext secrets file. This follows [Doppler's EAS guide](https://docs.doppler.com/docs/eas-build), using the current [`eas env:push`](https://docs.expo.dev/eas/cli/#eas-envpush-environment) command instead of the deprecated `eas secret:push`.

**This command changes EAS configuration.** It pushes every variable in the selected Doppler config and `--force` overwrites matching EAS variables. Use configs dedicated to this app, without unrelated service or CI credentials. EAS CLI 27 uploads non-`EXPO_PUBLIC_` variables with **sensitive** visibility: they are masked in build logs but remain readable to authorized users and EAS CLI during local config resolution. This includes `SENTRY_AUTH_TOKEN`, which the current validation requires locally; do not change required config inputs to EAS **secret** visibility without adapting that validation. Variables removed from Doppler are not deleted by `env:push`; remove obsolete values in EAS separately. Keep `STORYBOOK_ENABLED` unset or `false` in build configs.

After syncing, a cloud build can be submitted from a local shell, for example:

```sh
doppler run --config dev -- env APP_ENV=development EXPO_NO_DOTENV=1 \
  eas build --profile development --platform all
```

The submitting process uses Doppler for initial config resolution; the remote builder uses the synced EAS environment selected explicitly in `eas.json`. Use the matching config, `APP_ENV`, and profile from the table for other variants. Syncing and submitting builds are explicit operator actions, not part of installation or local start scripts.

## Internationalization

All the translations are managed on separate files located in the `src/infra/i18n/resources/` folder.

The default locale is English and other locales (French being already provided) are linted against the English file. Meaning that all keys in the English translation files need to be defined in the other files. This prevents having an app with missing translations on some locales.

Refer to the documentation of [i18next](https://www.i18next.com/) for explanations on how to use it.

## Using Storybook

React Native Storybook 10.7.0 is configured with colocated stories and the
on-device controls, backgrounds and actions addons. Core `storybook` and
`@storybook/react` use their compatible, separately versioned 10.6.3 release.

Start Metro with the development environment and Storybook enabled:

```sh
bun run start:storybook
```

Open the development app and navigate to `/storybook`. This is an in-app Expo
Router integration, so the app's existing providers remain available to stories.

Keep configuration in `.rnstorybook/` (the React Native default, not `.storybook/`
or `book/`). `main.ts` discovers `src/**/*.stories.*` and registers `deviceAddons`;
`preview.tsx` owns global decorators and parameters; `index.ts` creates the UI
with persisted selection. Metro regenerates `storybook.requires.ts` when enabled;
you can also run `bun run storybook:generate` after configuration changes.

`metro.config.cjs` keeps the Sentry configuration and applies `withStorybook` from
`@storybook/react-native/metro/withStorybook`. This supported in-app wrapper is
intentional: the newer `@storybook/react-native/withStorybook` wrapper swaps the
whole app entry point, which would bypass the Router layout and its providers.

Storybook is enabled only when `APP_ENV=development` **and**
`STORYBOOK_ENABLED=true`. Staging and production disable it even if the flag is
accidentally set; the client configuration also forces the flag off there.
When disabled, the Metro wrapper stubs `.rnstorybook/` and Storybook package
imports, cutting off the generated story imports from the production JS graph.
The route guard alone is not bundle exclusion, and `devDependencies` alone do not
prevent Metro from bundling imported code. Keep stories out of runtime barrels.

## Tests

There are basic tests with [Jest](https://jestjs.io/) and [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) that you can run with:

```sh
bun run test
```

> Always go through `bun run test`: a bare `bun test` would invoke Bun's own test runner instead of the Jest setup configured here.

React Native Testing Library v14 renders through `test-renderer`, and its render, hook and event helpers are async, so `await` them. Keep `test-renderer` on the same minor line as React (React 19.3 uses 1.3) and on the version `jest-expo` installs.

Local work, pre-push and CI use the same `jest.config.js`: half the available CPUs, rounded down, with a minimum of one worker and a maximum of six. Full-suite benchmarks on a 14-core machine plateaued around 4–8 workers; larger pools added overhead. Rebenchmark as the suite grows or runner hardware changes.

```sh
bun run test:coverage                                 # opt-in coverage
bun run test -- --runTestsByPath <test-file>           # focused tests
bun run test -- --watch                               # local feedback
bun run test -- --runInBand                           # serial debugging only
bun run test -- --maxWorkers=4                        # worker-count experiments
```

Jest caches transformations in `node_modules/.cache/jest`; caching does not skip test execution. Quality restores a compatible cache from earlier runs and saves it after a successful job. Full-suite runs fail if no tests are discovered; the pre-commit related-tests check explicitly allows no matching tests.

Coverage includes application code in `src/` and repository scripts in `scripts/`, excluding declarations, tests, test helpers, stories and `*.types.ts` files. Root/native configuration files are outside this scope.

For E2E tests, you can use [Maestro](https://maestro.mobile.dev/) for both OS.

First install Maestro on your machine, build the development app onto a simulator then run

```sh
bun run test:e2e
```

## Formatting and type checking

The project is using [Biome](https://biomejs.dev/) with the [Ultracite](https://github.com/haydenbleasel/ultracite) presets (linting and formatting) and [TypeScript](https://www.typescriptlang.org/) for type checking, you can run the checks with those commands:

```sh
bun run lint:ts
bun run lint
```

`bun run lint` auto-fixes issues (safe fixes + import sorting). For CI or a read-only check, use `bun run lint:ci`. Formatting can be run standalone with `bun run format` (`bun run format:check` for the read-only variant).

The config extends Ultracite's core and React presets, inheriting their defaults
(including undeclared-dependency checks). `biome.jsonc` documents the project-specific
exceptions. Filename linting accepts PascalCase components and camelCase supporting
files, with kebab-case also allowed for package-named mocks/type augmentations and
CLI scripts. Route files in `src/app/` must be kebab-case because Expo Router uses
them as URL segments. Inline JSX callbacks remain allowed.
YAML uses Biome's formatter; Markdown formatting stays disabled because
Biome 2.6 does not yet support the GFM tables and task lists used in this repository.
Markdown linting remains enabled, with frontmatter parsing for skills.

Ultracite 8.0.1 still references Biome's renamed `useSortedClasses` rule. The Bun
patch in `patches/ultracite@8.0.1.patch` migrates it to `useTailwindSortedClasses`
and moves its function options to the top-level Tailwind config. Bun applies it
on install; remove the patch and its `patchedDependencies` entry once an upstream
release includes that migration.

Those commands also run from the git hooks described below.

## Git hooks

The hooks are managed by [hk](https://hk.jdx.dev/), from the same author as mise. `mise install` runs `hk install --mise` for you through the `[hooks] postinstall` entry in `mise.toml`, so a fresh clone is wired up as soon as the toolchain is. You can always redo it by hand:

```sh
mise run hooks:install     # or: bun run hooks:install
```

Everything is declared in `hk.pkl`. With hk v2, the shared file-scoped steps create `pre-commit` and `fix` automatically; `check` and `pre-push` override them with whole-repo checks:

- **`pre-commit`** — scoped to the staged files, so it stays in the low seconds. Unstaged work is stashed first, then Biome fixes and re-stages what it touched, and `tsc-files` plus the related Jest tests run on the fixed content (they `depend` on Biome rather than racing it). Steps that touch the same file take a lock, so two tools never write to it at once. `hk fix` uses the same steps but leaves fixes unstaged. Gitleaks is the exception, scoped to this hook: its git-based staged mode scans the whole staged changeset, non-code files included, and aborts the commit with redacted findings when a hardcoded secret is detected. Fingerprint false positives in a root `.gitleaksignore` file, or skip the step once with `HK_SKIP_STEPS=gitleaks git commit`.
- **`commit-msg`** — validates the conventional commit format, which is what drives the changelog and the release workflow.
- **`pre-push`** — the safety net. Staged-file scoping can miss breakage in files the commit did not touch, so this one runs Biome, TypeScript and the full test suite over the whole repo. Biome and TypeScript run in parallel and the test suite waits on both, so a lint or type failure is reported in seconds instead of after the suite. `hk check --all` runs the same checks manually.

To skip the hooks for one command, use git's own escape hatch (`git commit --no-verify`), or `HK_SKIP_STEPS=test git commit` to skip a single step.

## GitHub Actions

The workflows follow a Git Flow setup with `develop` as the default branch:

- **Quality** runs on new and updated pull requests (against any branch). It checks TypeScript, Biome, and the full Jest suite in one job; a new push to the same PR cancels an older run. It does not run on every branch push, and skips the Release Please PR. Jest's transformation cache is separate from the dependency cache, keyed by OS/architecture, Node major, lockfile, Jest/Babel/TypeScript configuration and commit, with a compatible-prefix fallback for earlier commits.
- **PR title** checks that each PR title is a valid conventional commit, since it becomes the squash commit that Release Please reads.
- **Release** runs on pushes to `develop` and maintains the release PR (see below).
- **Dependabot** (`.github/dependabot.yml`) opens one weekly PR updating the GitHub Actions, which are pinned to commit SHAs. It skips releases younger than 3 days.
- **Cache Bun dependencies** warms the shared dependency cache on pushes to `develop` and when its workflow or the shared setup action changes in a PR. Quality and the development build restore that cache and still run `bun install --frozen-lockfile`. The Node/Bun setup, cache restore, and install steps live in `.github/actions/setup-dependencies/action.yml`.

### Tagging and releasing

Releases are automated with [Release Please](https://github.com/googleapis/release-please), driven by the conventional commit titles of squash-merged PRs. The **Release** workflow keeps a release PR open with the next version and its `CHANGELOG.md` entry. Build and submit that PR's head commit, and merge it only once both stores have approved the version: merging bumps `package.json`, tags the commit and creates the GitHub release. The workflow needs a `RELEASE_PLEASE_TOKEN` repository secret.

See [Releases, store submissions and OTA updates](docs/guides/releasing.md) for the full process, including store rejections and OTA hotfixes.

### Building the development app

First sync the Doppler `dev` config to the EAS `development` environment as described above. Add repository secrets `EXPO_TOKEN` (authorized for the EAS project) and `DOPPLER_TOKEN` (a read-only Doppler service token scoped to that project's `dev` config). Neither token should be committed or included in the app's Doppler config.

From the repository's **Actions** tab, select **Build the app for development** and choose **Run workflow**. The workflow installs dependencies and Doppler, resolves local app configuration with Doppler, and submits **both** platforms with the `development` profile from `eas.json` (an iOS simulator build and an Android APK). The remote builders use the synced EAS variables; the workflow does not sync or modify them. It uses `--no-wait`: the GitHub job finishes once EAS accepts the builds, so follow their results in the EAS dashboard. It does not publish an update or submit a store release.
