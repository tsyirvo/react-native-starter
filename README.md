# React Native Starter

- [React Native Starter](#react-native-starter)
  - [Explanations](#explanations)
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

## What's included

On the Developer Experience side, a test stack is setup (unit, functional and E2E), a CI on _Github Actions_, a _Storybook_, _TypeScript_ is also configured with _Biome_ (based on the _Ultracite_ presets). Commits are linted to automate the release workflows and the changelog generation.

There are also some utilities like:

- Converting `.svg` files into React components that can be used easily
- A pre-commit hook that runs on staged files for code quality checks
- Tooling to release and tag new versions

On the features side, there are already some things to get started quickly with any project:

- A GraphQL client with TanStack Query and CodeGen
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

The toolchain (Node, Yarn, EAS CLI) is managed by [mise](https://mise.jdx.dev/), so everyone works with the exact same versions locally. Install mise, then from the repo root:

```
mise trust
mise install
```

`mise install` reads the `[tools]` section of `mise.toml` and installs what's missing. Once mise is activated in your shell, entering the directory automatically puts the right `node` and `yarn` on your `PATH`.

Then install the packages:

```
yarn
```

If you'd rather not use mise, the project only requires Node >= 26 and Yarn 4 (the pinned Yarn release lives in `.yarn/releases`), and every task below has a plain `yarn` equivalent.

## Tasks with mise

Beyond tooling versions, `mise.toml` also declares tasks for the common workflows. They are thin wrappers around the `package.json` scripts, so both entry points stay in sync.

List everything available with:

```
mise tasks
```

Run one with `mise run <task>` (or just `mise <task>`), using the short alias when there is one:

```
mise run check:fix     # or: mise cf
mise run typecheck     # or: mise tc
mise run test          # or: mise t
```

The tasks are grouped as follows:

- **Quality** — `lint`, `lint:fix`, `format`, `format:fix`, `check`, `check:fix`, `check:ci`, `typecheck`, and `fix` which chains the auto-fixing ones
- **Tests** — `test`, `test:coverage`, `test:e2e`, and `ci` which chains `typecheck`, `check:ci` and `test` (what the _Quality_ workflow runs)
- **App** — `start`, `start:staging`, `start:production`, `storybook`, `storybook:generate`
- **Builds** — the local EAS builds, e.g. `build:dev:ios`, `build:staging:android`, `build:production:ios`
- **Utilities** — `install`, `codegen`, `generate:icons`, `doctor`, `clean`

Tasks declared with `depends` run their dependencies first, and in parallel when they are independent.

## Runing the project

Since a few SDKs are provided, secrets are required to use the app. You can have a look at the provided `.env` files to see what's needed. I personnaly use [Doppler](https://www.doppler.com/) CLI to manage secrets. This tools injects secrets in the environment when running commands and is actually used in the scripts exposed inside the `package.json` so you need to have it installed.

To launch the React Native packager:

```
yarn start:[dev|staging|production]
```

then

```
yarn build:[dev|staging|production]:[ios|android]
```

You will then be able to boot an iOS simulator or Android emulator, if installed on your machine.

## Stack

The most useful libraries already configured are the following:

[React Native](https://facebook.github.io/react-native/) with [Expo](https://docs.expo.dev/)

[Expo Router](https://docs.expo.dev/router/introduction/) for the routing

[Sentry](https://sentry.io/welcome/) for crash reporting

[Unistyles](https://www.unistyl.es/) for the styling

[i18next](https://www.i18next.com/) for the internationalization

[GraphQL](https://graphql.org/) with [CodeGen](https://the-guild.dev/graphql/codegen) and [TanStack Query](https://tanstack.com/query/latest) on the API side

[PostHog](https://www.flagsmith.com/) for analytics and feature flags

[Zustand](https://zustand-demo.pmnd.rs/) for a global store

[RevenueCat](https://www.revenuecat.com/) for in-app purchases

A few other interesting things are configured, don't hesitate to look around.

## Configure the tooling

Some tools are installed in the project, but you'll need to add your API keys and secrets to have them work properly. Check the documentation of each of those libraries on how to do this.

If you don't do this, the app won't launch at all. The CLI will tell you if one or more required environement variable is not set.

The libraries that needs configurations are the ones exposed inside the `.env` files:

- Expo
- Sentry
- PostHog
- RevenueCat

## Environments

The starter is configured with three distinct environments by default, Development, Staging and Production.

This is easier to work with on a real app, and allows you to have different enviroment variables easily, among other things.

Each environement variables are exposed through the `.env.[development|staging|production]` files at the root. As explained above, I personnaly use [Doppler](https://www.doppler.com/) to manage secrets and inject them when running commands.

## Internationalization

All the translations are managed on separate files located in the `src/infra/i18n/resources/` folder.

The default locale is English and other locales (French being already provided) are linted against the English file. Meaning that all keys in the English translation files need to be defined in the other files. This prevents having an app with missing translations on some locales.

Refer to the documentation of [i18next](https://www.i18next.com/) for explanations on how to use it.

## Using Storybook

A _Storybook_ is configured with some basic stories.

To access it, you simply have to run the app with the following command:

```
yarn start:storybook
```

## Tests

There are basic tests with [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/) that you can run with:

```
yarn test
```

For E2E tests, you can use [Maestro](https://maestro.mobile.dev/) for both OS.

First install Maestro on your machine, build the development app onto a simulator then run

```
yarn test:e2e
```

## Formatting and type checking

The project is using [Biome](https://biomejs.dev/) with the [Ultracite](https://github.com/haydenbleasel/ultracite) presets (linting and formatting) and [TypeScript](https://www.typescriptlang.org/) for type checking, you can run the checks with those commands:

```
yarn lint:ts
yarn lint
```

`yarn lint` auto-fixes issues (safe fixes + import sorting). For CI or a read-only check, use `yarn lint:ci`. Formatting can be run standalone with `yarn format` (`yarn format:check` for the read-only variant).

There is a pre-commit git hook that run some of those commands to have a consistent formatting and type checking.

## Github Actions

The project is configured to have the CI running on _Github Actions_ with a _Git Flow_.

The three main workflows are the following:

- A _Quality_ workflow runs against all PR targetting _develop_. It handles running tests, linting and TypeScript checks
- A _Release_ and _Tag_ ones, which creates a release and a tag for the project
- A _Build Dev App_ one, which triggers a build of the development env app on EAS (environement variables will need to be injected into EAS via secrets for the builds to work, [see here](https://docs.expo.dev/build-reference/variables/))
