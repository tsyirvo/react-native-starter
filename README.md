# React Native Starter

[![Build Status](https://travis-ci.org/tsyirvo/react-native-starter.svg?branch=develop)](https://travis-ci.org/tsyirvo/react-native-starter)

---

## The basics

### Dependencies and installation

You need to have Watchman installed:

```
brew install watchman
```

Install Cocoapods if needed:

```
sudo gem install cocoapods
```

Install the React Native CLI:

```
yarn global add react-native-cli
```

Install Yarn or have least have version 1.1.0 already installed:

```
curl -o- -L https://yarnpkg.com/install.sh | bash
```

Install the packages:

```
yarn
```

### Env files

To run the app, you need to have the necessaries env files.

### Running the project

To launch the React Native packager:

```
yarn start
```

### Run in a specific environment

The iOS app and the Android one both support 3 (development, staging and production) different environment, backed by the corresponding `.env` file.

To launch the app in a specific environment, the steps varies depending on the platform you're using:

For iOS: select the corresponding `Target` and `Scheme` then launch the app.

For Android: in the `Build Variants` tab, select the environment and build mode in which you want to launch the app then run it.

## Stack

[React Native](https://facebook.github.io/react-native/)

[React Navigation](https://reactnavigation.org/)

[Apollo](https://www.apollographql.com/docs/react/)

[Styled System](https://jxnblk.com/styled-system/)

[React Native Config](https://github.com/luggit/react-native-config)

[Lottie](https://github.com/airbnb/lottie-react-native/)

## Internationalization

All the translations are managed on a Google Excel doc. The app currently support EN and FR langages.

The translations can be found [via this link](https://docs.google.com/spreadsheets/d/1OZXKQsSQH7mYDFTEEgN-drJSR9N-z5bTxml0CY1cu3c/edit#gid=0/)

To sync the translations in the app, just run:

```
yarn sync-locales
```

## Adding images

All images are stored in the native images catalog for both iOS and Android.

To simplify the adding process and optimizing those images your can run the following command:

```
yarn add-image path/to/the/image/to/add
```

Currently you can only add images one by one.

## Generate new components

You can automaticaly generated new pages with all necessary imports and components with the command

```
yarn add-component
```

A CLI prompt will ask you all the infos about the naming.

## Tips

Sometimes, React Native can produce cryptic errors... To handle thoses scenarios, you can use the following command:

```
yarn clean-cache
```

## Other

The project is using [ESlint](https://eslint.org/) and [Prettier](https://prettier.io/) for code formating, you can run ESlint via the command:

```
yarn lint
```

There is a precommit git hook that run the linting command on the staged files.
