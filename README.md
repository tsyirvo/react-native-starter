# React Native Starter

- [React Native Starter](#react-native-starter)
  - [Explanations](#explanations)
  - [The setup](#the-setup)
  - [Runing the project](#runing-the-project)
  - [Stack](#stack)
  - [Internationalization](#internationalization)
  - [Adding images](#adding-images)
  - [Generate new components](#generate-new-components)
  - [Using the storybook](#using-the-storybook)
  - [Tests](#tests)
  - [Formatting and type checking](#formatting-and-type-checking)
  - [Github Actions](#github-actions)
  - [CodePush](#codepush)
  - [Release and Beta deployments](#release-and-beta-deployments)
  - [Tips](#tips)

---

## Explanations

This starter is the one I used in all my personal projects.

It's a basic start, but with most of the common dependencies I use so I can start new projetcts more easily.

You need to have Node (at least version 14) and Watchman installed:

On the dev side, a test stack is setup (unit and E2E), a CI on _Github Actions_ with release automation thanks to _Fastlane_, a _Storybook_ with some base addons, _TypeScript_ is also configured with _ESLint_ and _Prettier_, commits are linted to automated the release workflows and changelog generation.

There are also some utilities to generate new components or pages automatically, a script to compress images and add them to the native catalogs. A pre commit hook runs on staged files for code quality checks.

There is no data handling library since it varies from one project to the next.

## The setup

Install the packages and iOS Pods:

```
yarn install:all
```

## Runing the project

To launch the React Native packager:

```
yarn start
```

You can launch the simulators with the following commands:

```
yarn ios:[development|staging|production]
```

or

```
yarn android:[development|staging|production]
```

## Stack

[React Native](https://facebook.github.io/react-native/)

[React Navigation](https://reactnavigation.org/)

[Styled Components](https://styled-components.com/)

[Styled System](https://jxnblk.com/styled-system/)

[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)

[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

[CodePush](https://github.com/microsoft/react-native-code-push)

[React i18Next](https://react.i18next.com/)

[Fastlane](https://fastlane.tools/)

## Internationalization

All the translations are managed on separate `.json` file located in the `src/i18n/locales/` folder.

Refer to the documentation of [React i18Next](https://react.i18next.com/) for explanations on how to use the library.

## Adding images

All images are stored in the native images catalogs for both _iOS_ and _Android_.

To simplify the adding process, and optimizing those images, you can run the following command:

```
yarn image:add [path/to/the/image/to/add|path/to/the/folder]
```

## Generate new components

You can automaticaly generated new pages or components (functional or class ones) with all necessary imports and default content with thoses commands:

```
yarn generate:[page|fc|class]
```

A CLI prompt will ask you all the infos.

## Using the storybook

A _Storybook_ is already configured with some addons.

To access it, you can access the dev menu on the device and select _Toggle Storybook_ to have it shown in place of the app.

If new stories are not shown on the list, try running the command `yarn storybook` which automatically create a file importing all stories respecting a predefined pattern. This command also enable to use the Storybook with a remote server and change stories from a navigator outside of the app.

## Tests

There are basic tests with [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/) that you can run with:

```
yarn test
```

For E2E tests, you can use [Detox](https://github.com/wix/Detox) for both OS:

```
npx detox build -c ios.sim.[release|debug]
npx detox test -c ios.sim.[release|debug]

or

npx detox build -c android.emu.[release|debug]
npx detox test -c android.emu.[release|debug]
```

## Formatting and type checking

The project is using [ESlint](https://eslint.org/), [Prettier](https://prettier.io/) and [TypeScript](https://www.typescriptlang.org/) for code formating and type checking, you can run the checks with those commands:

```
yarn lint
yarn prettify
yarn tsc
```

There is a precommit git hook that run the prettify command to have a consistent formatting.

## Github Actions

The project is configured to have the CI running on _Github Actions_ with a _Git Flow_.

The two main workflows are the following:

A _Quality_ workflow runs against all PR targetting _develop_. It handles running tests, linting and TypeScript checks.

A _Deploy_ one, which release a new build of the app on App Center and on the stores.

You can look at the _.yml_ files to view all the workflows, and check the Github environment variables you will need if you want it to run on your end.

## CodePush

You have the possibility to bypass updating your apps via the platform stores when updating only JS files or image assets.

You first need to configure you app token for iOS and Android (read [here](https://github.com/microsoft/react-native-code-push)), add it to the env files, then create a new release.

By default, the development env can be left out of the config and only the staging and production one have to be setup with the keys.

## Release and Beta deployments

The releases automation is handled with [Fastlane](https://fastlane.tools/). You will need to install it before using it locally.

You will have to complete the `.env` files in both fastlane directories (ios and android) before being able to run the following lanes.

There are multiples lanes to do the most common things, and they need to be launched from the `ios` or `android` folder.

The versions are automaticaly handled based on the commit history.

For both Android and iOS, you can release beta versions to [App Center](https://appcenter.ms/):

```
fastlane release_staging
```

The same is applicable to deploy the apps to the respective stores platforms (Play Store & Apple Connect) with the commands:

```
fastlane release_production
```

For iOS, you have to manage the signing and adding testers to your profiles. It is done here with [Fastlane Match](https://docs.fastlane.tools/actions/match/).

To add testers to your App Center beta releases, their devices UDIDs need to be added to your account, simply add their devices info to the `ios/fastlane/devices.txt` file.

To generate new profiles to be able to deploy to theses users, run:

```
fastlane add_testers
```

On a new machine or if you need to fetch the latest certificates and profiles, run the command like so:

```
fastlane match_pull_all
```

You can check the expiracy date of push certificates and create new ones if necessary (validity is less than 30 days). This will also generate a new .p12 on which you will have to assign a password, then upload it to you backend. To do so, run the following command:

```
fastlane pem_check
```

## Tips

Sometimes, React Native can produce cryptic errors... To handle thoses scenarios, you can use the following command:

```
yarn clean
```

then

```
yarn install:all
```
