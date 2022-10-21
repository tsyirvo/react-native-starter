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

It's a basic start, but with most of the common dependencies I use so I can start new projetcts more easily.

Check the [React Native docs](https://reactnative.dev/docs/environment-setup) on how to preoperly setup your dev environment. It uses Expo with a custom Development Build, so you also need to setup [Expo tooling](https://docs.expo.dev/).

On the dev side, a test stack is setup (unit, functional and E2E), a CI on _Github Actions_, a custom _Storybook_, _TypeScript_ is also configured with _ESLint_ and _Prettier_. Commits are linted to automate the release workflows and the changelog generation.

There are also some utilities to generate new pages automatically, a script to compress images and add them to the native catalogs. A pre commit hook runs on staged files for code quality checks.

There is no data handling library since it varies from one project to the next.

## The setup

Install the packages:

```
yarn
```

## Runing the project

To launch the React Native packager:

```
yarn start:dev
```

You will then be able to boot an iOS simulator or Android emulator, if installed on your machine.

## Stack

The most useful libraries already builtin are the following:

[React Native](https://facebook.github.io/react-native/)

[React Navigation](https://reactnavigation.org/)

[Restyle](https://github.com/Shopify/restyle/)

[i18 JS](https://github.com/fnando/i18n-js/)

[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)

[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

A few other interesting things are configured, don't hesitate to look around.

## Configure the tooling

Some tools are installed in the project, but you'll need to add your API keys and such to have them work properly. Check the documentation of each of those libraries on how to do this. If you don't do this, the app won't launch at all.

You will have to finalize the following configurations:

- Sentry
- MixPanel
- Firebase

## Environments

The starter is configured with four distinct environments by default, Development, Testing, Staging and Production.

This is easier to work with on a real app, and allows you to have different enviroment variables easily, among other things.

Feel free to edit the values and add the necessary ones to it so the app can work properly.

## Internationalization

All the translations are managed on separate `.json` file located in the `src/i18n/locales/` folder.

Refer to the documentation of [i18 JS](https://github.com/fnando/i18n-js/) for explanations on how to use it.

## Adding images

All images are stored in the native images catalogs for both _iOS_ and _Android_.

To simplify the adding process, and optimizing those images, you can run the following command:

```
yarn image:add [path/to/the/image/to/add|path/to/the/folder]
```

## Generate new components

You can automaticaly generated new pages with all the necessary files, tests and injection with this command:

```
yarn generate:page
```

A CLI prompt will ask you all the infos.

## Using the custom Sandbox

A custom _Sandbox_ is configured with some basic examples and navigation.

To access it, you can access the dev menu on the device and select _Toggle Sandbox_ to have it shown in place of the app.

## Tests

There are basic tests with [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/) that you can run with:

```
yarn test
```

For E2E tests, you can use [Detox](https://github.com/wix/Detox) for both OS:

```
e2e:build:ios:debug
e2e:test:ios:debug

or

e2e:build:android
e2e:test:android
```

## Formatting and type checking

The project is using a custom [ESlint](https://eslint.org/) config ([see here](https://github.com/tsyirvo/eslint-config-tsyirvo-react-native)), [Prettier](https://prettier.io/) and [TypeScript](https://www.typescriptlang.org/) for code formating and type checking, you can run the checks with those commands:

```
yarn lint
yarn prettify
yarn tsc
```

There is a precommit git hook that run some of those commands to have a consistent formatting and type checking.

## Github Actions

The project is configured to have the CI running on _Github Actions_ with a _Git Flow_.

The two main workflows are the following:

A _Quality_ workflow runs against all PR targetting _develop_. It handles running tests, linting and TypeScript checks.

A _Release_ and _Tag_ one, which creates a release and a tag for the project.

You can look at the _.yml_ files to view all the workflows, and check the Github environment variables you will need if you want it to run on your end.
