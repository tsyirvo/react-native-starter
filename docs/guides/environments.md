# Environments

This guide shows how the app gets its configuration for each environment, and
how to send that configuration to EAS cloud builders.

## Overview

[Doppler](https://www.doppler.com/) is the only source of environment values.
There are no runtime `.env` files to keep or generate. Keep all
environment-specific values in Doppler, including `APP_NAME` and `APP_ENV`.

| App environment | Doppler config | EAS environment | EAS build profiles                  |
| --------------- | -------------- | --------------- | ----------------------------------- |
| Development     | `dev`          | `development`   | `development`, `development-device` |
| Staging         | `stg`          | `preview`       | `staging`                           |
| Production      | `prd`          | `production`    | `production`                        |

Each Doppler config contains `APP_ENV` and `EXPO_NO_DOTENV`. Thus, the
Doppler config that you select also selects the app variant. Do not set these
values in commands. The EAS profiles set the same values on the remote
builders, in case the EAS environment does not contain them. `NODE_ENV` does
not select the app variant.

| Doppler config | `APP_ENV`     | `EXPO_NO_DOTENV` |
| -------------- | ------------- | ---------------- |
| `dev`          | `development` | `1`              |
| `stg`          | `staging`     | `1`              |
| `prd`          | `production`  | `1`              |

`doppler.yaml` sets the Doppler project and the default config (`dev`). Thus,
`doppler setup` does not ask questions. A script without `--config` uses the
`dev` config. The staging scripts use `--config stg`, and the production
scripts use `--config prd`. If your Doppler project or configs have different
names, change `doppler.yaml` and the `--config` arguments.

Doppler keeps its setup for each directory and its subdirectories. A git
worktree outside the main checkout does not have a setup. The `post-checkout` git hook runs
`doppler setup` in the new worktree for you. Read
[Code quality](code-quality.md#post-checkout).

## Run Expo and EAS CLI commands

`app.config.ts` checks the environment values. Thus, each Expo or EAS CLI
command that reads `app.config.ts` needs the Doppler values. Do not run the
`expo` and `eas` CLIs directly. Use the `expo` and `eas` scripts. These scripts
run the CLI with `doppler run`:

```sh
bun expo prebuild --clean
bun expo config --type public
bun eas build:list
```

These scripts use the `dev` config. To use a different config, set
`DOPPLER_CONFIG`:

```sh
DOPPLER_CONFIG=prd bun eas update --channel production --environment production
```

## How the app reads its configuration

1. Doppler injects the values into the command.
2. `env.js` checks them. It stops with an error if a required value is
   missing or empty.
3. `app.config.ts` reads the values and exposes only `ClientEnv` to the app,
   through `extra`.

Build credentials, such as `SENTRY_AUTH_TOKEN`, are not part of the client
configuration. `APP_ENV` also sets the bundle and package suffixes, and
enables OTA updates only in production.

## Do not use `.env` files

[`.env.example`](../../.env.example) lists the variables. It is documentation
only. Do not copy it to `.env`.

- Git ignores runtime `.env` files.
- `EXPO_NO_DOTENV=1` stops Expo from reading `.env` files. Each Doppler config
  and each EAS profile sets this value.
- Bun reads `.env` files automatically. If you have old local `.env` files,
  remove them.

## Cloud builds

Local builds get their values from `doppler run`. EAS cloud builders do not. Before
the first cloud build, and each time a value changes, push the Doppler config
to the matching **project-level** EAS environment.

> **Warning:** this command changes the EAS configuration. Read
> [What the sync changes](#what-the-sync-changes) before you run it.

1. Log in to EAS with `eas login`. In CI, set `EXPO_TOKEN`.
2. From the repository root, run this command for development:

   ```sh
   doppler run --config dev -- \
     doppler run --config dev --mount .env.eas-sync --format env -- \
     eas env:push development --path .env.eas-sync --force
   ```

3. For the other environments, change **both** `--config` values and the EAS
   environment:

   | Environment | `--config` | EAS environment |
   | ----------- | ---------- | --------------- |
   | Staging     | `stg`      | `preview`       |
   | Production  | `prd`      | `production`    |

The outer Doppler command supplies the values that EAS CLI needs to read
`app.config.ts`. The inner command mounts a temporary named pipe for
`env:push`. Doppler removes the pipe when the command stops, so no plain-text
secrets file stays on disk. This procedure follows
[Doppler's EAS guide](https://docs.doppler.com/docs/eas-build), but uses
[`eas env:push`](https://docs.expo.dev/eas/cli/#eas-envpush-environment)
instead of the deprecated `eas secret:push`.

After the sync, you can start a cloud build from your computer:

```sh
bun eas build --profile development --platform all
```

For a different environment, set `DOPPLER_CONFIG` and use the matching
profile. Read the table in [Overview](#overview). For example:

```sh
DOPPLER_CONFIG=stg bun eas build --profile staging --platform all
```

Cloud builds use paid EAS resources.

### What the sync changes

- It pushes **all** the variables in the selected Doppler config, including
  `APP_ENV` and `EXPO_NO_DOTENV`. Use configs
  that contain only this app's values, with no credentials for other services
  or CI.
- `--force` replaces EAS variables that have the same name.
- It does not remove EAS variables that you removed from Doppler. Remove them
  in EAS yourself.
- EAS CLI 27 uploads variables without the `EXPO_PUBLIC_` prefix with
  **sensitive** visibility. Build logs mask them, but authorized users and EAS
  CLI can read them. This includes `SENTRY_AUTH_TOKEN`, which local validation
  needs. Do not change required variables to **secret** visibility unless you
  also change the validation.
- Keep `STORYBOOK_ENABLED` unset or `false` in build configs.

The sync and the cloud builds are manual operator actions. Installation and
the local start scripts never run them.
