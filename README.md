# React Native Starter

- [React Native Starter](#react-native-starter)
  - [Explanations](#explanations)
  - [The setup](#the-setup)
  - [Runing the project](#runing-the-project)
  - [Stack](#stack)
  - [Configure the tooling](#configure-the-tooling)
  - [Environments](#environments)
  - [Internationalization](#internationalization)
  - [Adding images](#adding-images)
  - [Generate new components](#generate-new-components)
  - [Using the custom Sandbox](#using-the-custom-sandbox)
  - [Tests](#tests)
  - [Formatting and type checking](#formatting-and-type-checking)
  - [Github Actions](#github-actions)

---

## Explanations

This starter is the one I used for my personal projects.

It's a basic start, but with most of the common dependencies and tools I use so I can start new projetcts more easily.

Check the [React Native docs](https://reactnative.dev/docs/environment-setup) on how to properly setup your dev environment. It uses Expo with a custom Development Build, so you also need to setup [Expo tooling](https://docs.expo.dev/).

On the Developer Experience side, a test stack is setup (unit, functional and E2E), a CI on _Github Actions_, a custom _Storybook_, _TypeScript_ is also configured with _ESLint_ and _Prettier_. Commits are linted to automate the release workflows and the changelog generation.

There are also some utilities like:

- Creating new screens automatically, injecting the code where needed to expose it on the navigation stack, create types and have a test file
- A script to compress images and to create the different files for each resolution
- Converting `.svg` files into React components that can be used easily
- A pre-commit hook that runs on staged files for code quality checks
- Tooling to release and tag new versions

On the features side, there are already some things to get started quickly with any project:

- A GraphQL client with TanStack Query and CodeGen
- Form validation with Keyboard handling
- Notifications
- App Store rating
- Feature Flags
- Error monitoring
- Analytics

There are a few other things setup which you can discover on your own ;)

## The setup

Install the packages:

```
yarn
```

## Runing the project

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

[React Navigation](https://reactnavigation.org/) for the routing

[Sentry](https://sentry.io/welcome/) for crash reporting

[Restyle](https://github.com/Shopify/restyle/) for the styling

[i18next](https://www.i18next.com/) for the internationalization

[GraphQL](https://graphql.org/) with [CodeGen](https://the-guild.dev/graphql/codegen) and [TanStack Query](https://tanstack.com/query/latest) on the API side

[One Signal](https://onesignal.com/) for notifications

[Flagsmith](https://www.flagsmith.com/) for feature flags

[Zustand](https://zustand-demo.pmnd.rs/) for a global store

[Amplitude](https://amplitude.com/) for analytics

A few other interesting things are configured, don't hesitate to look around.

## Configure the tooling

Some tools are installed in the project, but you'll need to add your API keys and secrets to have them work properly. Check the documentation of each of those libraries on how to do this.

If you don't do this, the app won't launch at all. The CLI will tell you if one or more required environement variable is not set.

The libraries that needs configurations are the ones exposed inside the `.env` files:

- Expo
- Sentry
- Flagsmith
- Amplitude
- One Signal

## Environments

The starter is configured with three distinct environments by default, Development, Staging and Production.

This is easier to work with on a real app, and allows you to have different enviroment variables easily, among other things.

Each environement variables are exposed through the `.env.[development|staging|production]` files at the root. I personnaly use [Doppler](https://www.doppler.com/) to manage secrets and inject them in the project.

## Internationalization

All the translations are managed on separate `.json` files located in the `src/core/i18n/resources/` folder.

Refer to the documentation of [i18next](https://www.i18next.com/) for explanations on how to use it.

## Adding images

To simplify adding new images to the project and optimizing them, you can run the following command:

```
yarn image:add [path/to/the/image/to/add|path/to/the/folder]
```

## Generate new screens

You can automaticaly generated new screens with all the necessary files, tests and injection with this command:

```
yarn generate:screens
```

A CLI prompt will ask you all the infos.

## Using the custom Sandbox

A custom _Sandbox_ is configured with some basic examples and navigation. Once [StoryBook](https://storybook.js.org/) for React Native will support V8, I'll migrate to using that.

To access it, you can access the dev menu on the device and select _Toggle Sandbox_ to have it shown in place of the app.

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

The project is using a custom [ESlint](https://eslint.org/) config ([see here](https://github.com/tsyirvo/eslint-config-tsyirvo-react-native)), [Prettier](https://prettier.io/) and [TypeScript](https://www.typescriptlang.org/) for code formating and type checking, you can run the checks with those commands:

```
yarn lint
yarn prettify
yarn tsc
```

There is a pre-commit git hook that run some of those commands to have a consistent formatting and type checking.

## Github Actions

The project is configured to have the CI running on _Github Actions_ with a _Git Flow_.

The three main workflows are the following:

- A _Quality_ workflow runs against all PR targetting _develop_. It handles running tests, linting and TypeScript checks
- A _Release_ and _Tag_ ones, which creates a release and a tag for the project
- A _Build Dev App_ one, which triggers a build of the development env app on EAS (environement variables will need to be injected into EAS via secrets for the builds to work, [see here](https://docs.expo.dev/build-reference/variables/))
