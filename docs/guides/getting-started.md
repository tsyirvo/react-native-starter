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

To run the development app on a simulator or emulator, use one of these
scripts:

```sh
bun run run:dev:ios        # iOS simulator
bun run run:dev:android    # Android emulator
```

Each script builds the development app, installs it and starts the packager.
The scripts use `expo run` with the EAS build cache. Read
[Share development builds](#share-development-builds).

Run the script again when the native code or the native dependencies change.
When only the JavaScript code changes, start only the packager:

```sh
bun run start
```

To install the development app on a physical iPhone, add `--device`:

```sh
bun run run:dev:ios -- --device
```

To test a staging or production variant, use the matching build scripts:

| Environment | Builds                                                 |
| ----------- | ------------------------------------------------------ |
| Staging     | `bun run build:stg:ios`, `bun run build:stg:android`   |
| Production  | `bun run build:prod:ios`, `bun run build:prod:android` |

These builds run on your computer. They are local EAS builds. Each one writes an
artifact, but does not install it. Staging and production builds contain the
JavaScript bundle, so they do not use the packager. To use EAS cloud builders,
read [Environments](environments.md#cloud-builds).

### Share development builds

In `app.config.ts`, `buildCacheProvider` uses the
[EAS build cache provider](https://docs.expo.dev/guides/cache-builds-remotely/)
(`eas-build-cache-provider`). When you run `bun run run:dev:ios` or
`bun run run:dev:android`, Expo does these steps:

1. Expo calculates the project
   [fingerprint](https://docs.expo.dev/versions/latest/sdk/fingerprint/) for
   the platform.
2. Expo looks for a development build with the same fingerprint on EAS. If EAS
   has one, Expo downloads it and installs it. Expo does not build the native
   app.
3. If EAS does not have one, Expo builds the app on your computer. Then Expo
   uploads the build to EAS. The next person with the same fingerprint can use
   this build.

To use the cache, do these steps:

1. Log in to EAS with `eas login`.
2. Use an account that has access to the EAS project.

If you are not logged in, or if Expo cannot connect to EAS, Expo builds the app
on your computer as usual.

The fingerprint includes the resolved app configuration. Thus, the fingerprint
also changes when the Doppler values change. Two people can share a build only
when they use the same Doppler config, the same native code and the same native
dependencies.

These builds do not use the cache:

- iOS builds for a physical device (`--device`). The cache keeps only simulator
  builds.
- `eas build` commands. This includes the staging and production scripts and
  the cloud builds.

`appVersionSource` is `remote` in `eas.json`. Thus, a cached build keeps the
build number that it had when Expo made it. This is not a problem for
development.

Your EAS project keeps the uploaded builds and the fingerprint sources. Each
build contains the client configuration from Doppler. An EAS development build
contains the same configuration.

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
