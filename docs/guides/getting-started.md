# Getting started

This guide shows how to install the toolchain, connect the secrets and run the
development app on a simulator or emulator.

## Prerequisites

- A React Native development environment. Read the
  [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment).
- The [Expo tooling](https://docs.expo.dev/). The app uses a custom
  [development build](https://docs.expo.dev/develop/development-builds/introduction/),
  not Expo Go.
- [mise](https://mise.jdx.dev/), to install the correct tool versions.
- The [Doppler CLI](https://docs.doppler.com/docs/install-cli), to supply the
  secrets.
- An iOS simulator (Xcode) or an Android emulator (Android Studio).

## Install the toolchain

mise installs Node, Bun, EAS CLI, hk and Gitleaks at the versions in
`mise.toml`. From the repository root, run:

```sh
mise trust
mise install
```

`mise install` also installs the git hooks. Read
[Code quality](code-quality.md#git-hooks) for more information.

`mise install` does not change the `PATH` of your current shell. To use the
correct `node` and `bun` each time you open the directory, add the
[mise shell activation](https://mise.jdx.dev/getting-started.html#activate-mise).
If you do not use the activation, put `mise exec --` before each command, for
example `mise exec -- bun install`.

You can also work without mise. In that case, install Node 26 or later and
Bun 1.4.4 or later. Each mise task has an equivalent `bun run` script.

## Install the packages

```sh
bun install
```

`bunfig.toml` sets a minimum package age of 3 days. Bun only installs package
versions that are at least 3 days old. Read
[Code quality](code-quality.md#dependency-age) to make an exception.

## Configure the secrets

The app uses Doppler for all environment values. There are no runtime `.env`
files.

1. Log in: `doppler login`.
2. Select your project: `doppler setup`.
3. In Doppler, create the `dev`, `stg` and `prd` configs.
4. Add each variable from [`.env.example`](../../.env.example) to each config.
   Do not leave a value empty.

The app does not start if a required variable is missing or empty. The CLI
shows the name of each missing variable. The variables are for these services:

- Expo and EAS
- Sentry
- PostHog
- RevenueCat

Read [Environments](environments.md) for the full configuration.

## Run the app

First, build the development app and install it on a simulator or emulator.
Do this again each time the native code or the native dependencies change.

```sh
bun run build:dev:ios        # iOS simulator
bun run build:dev:android    # Android emulator
```

Then start the packager for the same environment:

```sh
bun run start:dev
```

Open the development app on the simulator or emulator. It connects to the
packager.

To test a staging or production variant, use the matching scripts:

| Environment | Packager                   | Builds                                                 |
| ----------- | -------------------------- | ------------------------------------------------------ |
| Development | `bun run start:dev`        | `bun run build:dev:ios`, `bun run build:dev:android`   |
| Staging     | `bun run start:staging`    | `bun run build:stg:ios`, `bun run build:stg:android`   |
| Production  | `bun run start:production` | `bun run build:prod:ios`, `bun run build:prod:android` |

To install the development app on a physical iPhone, use
`bun run build:dev-device:ios`.

These builds run on your computer. To use EAS cloud builders, read
[Environments](environments.md#cloud-builds).

## Tasks with mise

`mise.toml` declares tasks for the common workflows. Each task calls a
`package.json` script, so the two entry points do the same thing.

To list all the tasks, run `mise tasks`. To run a task, use `mise run <task>`
or its short alias:

```sh
mise run check:fix     # or: mise cf
mise run typecheck     # or: mise tc
mise run test          # or: mise t
```

| Group     | Tasks                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------ |
| Quality   | `lint`, `lint:fix`, `format`, `format:fix`, `check`, `check:fix`, `check:ci`, `typecheck`, `fix` |
| Tests     | `test`, `test:coverage`, `test:e2e`, `ci`                                                        |
| Git hooks | `hooks:install`, `hooks:check`, `hooks:fix`, `hooks:pre-commit`, `hooks:pre-push`                |
| Utilities | `clean`                                                                                          |

- `ci` runs `typecheck`, `check:ci` and `test`. The Quality workflow runs the
  same checks.
- `fix` runs all the tasks that change files. It runs them one after the other,
  because they write to the same files.
- Other tasks that have dependencies run their independent dependencies in
  parallel.

## Next steps

- [Architecture](architecture.md): where to put new code.
- [UI](ui.md): styles, icons, translations and Storybook.
- [Testing](testing.md): how to write and run tests.
