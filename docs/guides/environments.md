# Environments

This guide shows how the app gets its configuration for each environment, and
how to send that configuration to EAS cloud builders.

## Overview

[Doppler](https://www.doppler.com/) is the only source of environment values.
There are no runtime `.env` files to keep or generate. Keep all
environment-specific values in Doppler, including `APP_NAME`.

| App environment | Doppler config | EAS environment | EAS build profiles                  |
| --------------- | -------------- | --------------- | ----------------------------------- |
| Development     | `dev`          | `development`   | `development`, `development-device` |
| Staging         | `stg`          | `preview`       | `staging`                           |
| Production      | `prd`          | `production`    | `production`                        |

The `package.json` scripts select the Doppler config and set `APP_ENV`. The EAS
profiles set the same value on the remote builders. `NODE_ENV` does not select
the app variant.

If your Doppler configs have different names, change the `--config` arguments
in `package.json` and in the development build workflow.

## How the app reads its configuration

1. Doppler injects the values into the command.
2. `env.js` validates them. It stops with an error if a required value is
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
- `EXPO_NO_DOTENV=1` stops Expo from reading `.env` files in the app commands
  and the EAS profiles.
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
   doppler run --config dev -- env APP_ENV=development EXPO_NO_DOTENV=1 \
     doppler run --config dev --mount .env.eas-sync --format env -- \
     eas env:push development --path .env.eas-sync --force
   ```

3. For the other environments, change **both** `--config` values, the
   `APP_ENV` value and the EAS environment:

   | Environment | `--config` | `APP_ENV`    | EAS environment |
   | ----------- | ---------- | ------------ | --------------- |
   | Staging     | `stg`      | `staging`    | `preview`       |
   | Production  | `prd`      | `production` | `production`    |

The outer Doppler command supplies the values that EAS CLI needs to read
`app.config.ts`. The inner command mounts a temporary named pipe for
`env:push`. Doppler removes the pipe when the command stops, so no plain-text
secrets file stays on disk. This procedure follows
[Doppler's EAS guide](https://docs.doppler.com/docs/eas-build), but uses
[`eas env:push`](https://docs.expo.dev/eas/cli/#eas-envpush-environment)
instead of the deprecated `eas secret:push`.

After the sync, you can start a cloud build from your computer:

```sh
doppler run --config dev -- env APP_ENV=development EXPO_NO_DOTENV=1 \
  eas build --profile development --platform all
```

For other environments, use the matching config, `APP_ENV` and profile from
the table in [Overview](#overview). Cloud builds use paid EAS resources.

### What the sync changes

- It pushes **all** the variables in the selected Doppler config. Use configs
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
