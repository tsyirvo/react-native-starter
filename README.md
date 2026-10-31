# React Native Starter

A lightweight [Expo](https://docs.expo.dev/) starter for React Native apps. It
gives you the tools and services that most published apps need, so you can
start to write product code on the first day.

## Why this starter

Many starter kits include more UI components and libraries than an app uses.
This starter keeps only the essentials. It focuses on tooling and common
integrations, not on a large UI kit. It is the base that I use for my personal
projects and for some client work.

## What's included

**App features**

- File-based navigation with [Expo Router](https://docs.expo.dev/router/introduction/)
- Data fetching and caching with [TanStack Query](https://tanstack.com/query/latest)
- Forms with [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) validation and keyboard handling
- Styling and themes with [Unistyles](https://www.unistyl.es/)
- Translations with [i18next](https://www.i18next.com/) (English and French)
- A global store with [Legend State](https://legendapp.com/open-source/state/) and local storage with MMKV
- Analytics and feature flags with [PostHog](https://posthog.com/)
- Crash reports with [Sentry](https://sentry.io/)
- In-app purchases with [RevenueCat](https://www.revenuecat.com/)
- An App Store rating prompt, push notification permissions, maintenance and forced-update screens
- A demo sign-in flow (not production authentication)

**Developer tools**

- TypeScript, with [Biome](https://biomejs.dev/) for lint and format
- Unit and component tests with Jest and React Native Testing Library
- End-to-end tests with [Maestro](https://maestro.dev/)
- An on-device [Storybook](https://storybook.js.org/)
- SVG icons compiled into a typed icon font
- Git hooks that check code and scan for secrets before each commit
- GitHub Actions for pull request checks and development builds
- Automatic versions, changelog and release tags from commit messages
- Instructions and skills for AI coding agents

## Quick start

You need [mise](https://mise.jdx.dev/), the
[Doppler CLI](https://docs.doppler.com/docs/install-cli) and an iOS simulator or
Android emulator.

1. Install the toolchain: `mise trust && mise install`.
2. Install the packages: `bun install`.
3. Connect Doppler: `doppler login`, then `doppler setup`.
4. Build and install the development app: `bun run build:dev:ios` or `bun run build:dev:android`.
5. Start the packager: `bun run start:dev`.

The app does not start until you set its secrets in Doppler. Read
[Getting started](docs/guides/getting-started.md) for the full steps.

## Project structure

```text
src/
├── app/           # Expo Router routes only
├── application/   # app-wide workflows: auth, startup, app availability
├── features/      # user-facing flows and their UI
├── infra/         # SDK integrations, storage, API and configuration
├── shared/        # reusable UI, theme, hooks and utilities
├── domain/        # pure models and rules
├── assets/        # images and other media
└── testing/       # test setup and helpers
```

[Architecture](docs/guides/architecture.md) gives the import rules and the
folder conventions.

## Guides

| Guide                                             | Read it when you want to…                               |
| ------------------------------------------------- | ------------------------------------------------------- |
| [Getting started](docs/guides/getting-started.md) | Install the toolchain and run the app                   |
| [Architecture](docs/guides/architecture.md)       | Know where code goes and which imports are permitted    |
| [Environments](docs/guides/environments.md)       | Manage secrets and app variants, or start cloud builds  |
| [UI](docs/guides/ui.md)                           | Use styles, icons, images, translations and Storybook   |
| [Testing](docs/guides/testing.md)                 | Write and run unit, component and E2E tests             |
| [Code quality](docs/guides/code-quality.md)       | Run lint, format and type checks, and use the git hooks |
| [Continuous integration](docs/guides/ci.md)       | Know what each GitHub Actions workflow does             |
| [Releasing](docs/guides/releasing.md)             | Release a store version or send an OTA update           |

## AI coding agents

You can use any coding agent. The shared instructions are in
[AGENTS.md](AGENTS.md). [Agent tooling](docs/agents/README.md) shows how to
connect your agent to the instructions, skills and MCP servers.
