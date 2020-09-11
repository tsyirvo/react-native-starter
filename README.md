# React Native Starter

[![Build Status](https://travis-ci.org/tsyirvo/react-native-starter.svg?branch=develop)](https://travis-ci.org/tsyirvo/react-native-starter)

---

## The setup

### React Native setup

Those steps apply for a MacOS setup with the use of `brew` to install the tools.

You need to have Node (at least version 10) and Watchman installed:

```
brew install node
brew install watchman
```

Install the React Native CLI:

```
yarn global add react-native-cli
```

### iOS setup

You need to have Xcode installed with the `Command Line Tools` downloaded.

Install Cocoapods if needed:

```
sudo gem install cocoapods
```

### Android setup

You first need to have the Java Development Kit installed:

```
brew cask install adoptopenjdk/openjdk/adoptopenjdk8
```

You can now install [Android Studio](https://developer.android.com/studio) and with it, download the following:

- Android SDK
- Android SDK Platform
- Android NDK
- Android Virtual Device

Once it's done, add the `sdk` to your environment variables and the following folders to your path:

```
ANDROID_HOME=$HOME/Library/Android/sdk
$ANDROID_HOME/emulator
$ANDROID_HOME/tools
$ANDROID_HOME/tools/bin
$ANDROID_HOME/platform-tools

```

### Dependencies installations

Install the packages:

```
yarn
```

For iOS, you need to install the pods.

```
cd ios && pod install
```

## Runing the project

To launch the React Native packager:

```
yarn start
```

You can run the simulators with the commands below:

```
make ios-run-[development|staging|production]
or
make android-run-[development|staging|production]
```

## Run in a specific environment

The iOS app and the Android one both support 3 (development, staging and production) different environments, backed by the corresponding `.env` file.

To launch the app in a specific environment, the steps varies depending on the platform you're using:

For iOS: select the corresponding `Target` and `Scheme` then launch the app.

For Android: in the `Build Variants` tab, select the environment and build mode in which you want to launch the app then run it.

## Stack

[React Native](https://facebook.github.io/react-native/)

[React Navigation](https://reactnavigation.org/)

[Styled Components](https://styled-components.com/)

[Styled System](https://jxnblk.com/styled-system/)

[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)

[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

[Firebase](https://firebase.google.com/)

[CodePush](https://github.com/microsoft/react-native-code-push)

[React i18Next](https://react.i18next.com/)

[Fastlane](https://fastlane.tools/)

## Internationalization

All the translations are managed on separate `.json` file located in the `src/i18n/locales/` folder.

Refer to the documentation of React i18Next for explanation on how to use the library.

## Adding images

All images are stored in the native images catalogs for both iOS and Android.

To simplify the adding process, and optimizing those images, you can run the following command (as many as you want or a whole folder):

```
yarn add-image [path/to/the/image/to/add | path/to/the/folder]
```

## Generate new components

You can automaticaly generated new pages or components (functional or class ones) with all necessary imports and default content with thoses commands:

```
yarn generate:page
or
yarn generate:fc
or
yarn generate:class
```

A CLI prompt will ask you all the infos.

## Use the storybook

A Storybook is already configured with some addons.

To access it, you can access the dev menu on the device and select _Toggle Storybook_ to have it shown in place of the app.

If new stories are not shown on the list, try running the command `yarn storybook` which automatically create a file importing all stories respecting a predefined pattern. This command also enable to use the Storybook with a remote server and change stories from a navigator outside of the app.

## Tests

There are basic tests with [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/) that you can run with:

```
yarn test
```

For E2E tests, you can use [Detox](https://github.com/wix/Detox) for both OS:

```
npx detox build -c [release|debug] ios.sim.[release|debug]
npx detox test -c [release|debug] ios.sim.[release|debug]

or

npx detox build -c [release|debug] android.emu.[release|debug]
npx detox test -c [release|debug] android.emu.[release|debug]
```

## Formatting and type checking

The project is using [ESlint](https://eslint.org/), [Prettier](https://prettier.io/) and [TypeScript](https://www.typescriptlang.org/) for code formating and type checking, you can run the checks with those commands:

```
yarn lint
yarn prettify
yarn tsc
```

There is a precommit git hook that run the prettify command to have a consistent formatting.

## Crash reports & Analytics

You need to create your own Firebase config files and put them where needed on Android and iOS.

You can refer [here](https://firebase.google.com/docs/projects/multiprojects) to learn how to do this to multiple targets projects like this one.

One the projects are setup, you will have access to the Crashlytics and Analytics dashboard on Firebase.

## CodePush

You have the possibility to bypass updating your apps via the platform stores when updating only JS files or image assets.

You first need to configure you app token for iOS and Android (read [here](https://github.com/microsoft/react-native-code-push)), add it where needed, then create a new release.

For iOS, check the individual targets `.plist` files and insert the value for `CODEPUSH_KEY`.

For Android, in `app/build.gradle`, where the flavors are defined, insert the key values.

By default, the development env can be left out of the config and only the staging and production one have to be setup with the keys.

## Releases and Beta deployments

The releases automation is handled with [Fastlane](https://fastlane.tools/). You will need to install it before using it.

You will have to complete the `.env` files in both fastlane directories (ios and android) before being able to run the following lanes.

There are multiples lanes to do the most common things, and they need to be launched from the `ios` or `android` folder.

For both Android and iOS, you can release beta versions to [App Center](https://appcenter.ms/) that either use the production or the staging env:

```
fastlane beta env:[staging|prod]
```

The same is applicable to deploy the apps to the respective stores platforms (Play Store & Apple Connect) with the commands:

```
fastlane release env:[staging|prod]
```

There are also platform specific lanes.

For Android:, the AABs uploaded to the play store are in the alpha track by default, so you can move it up with those commands:

```
fastlane promote_alpha_to_beta
and
fastlane promote_beta_to_production
```

For iOS, you have to manage the signing and adding testers to your profiles.

To add testers to you App Center beta releases, their devices UUIDs need to be added to your account, simply add their devices info to the `ios/fastlane/devices.txt` file.

To generate new profiles to be able to deploy to theses users, run:

```
fastlane match_pull_all readonly:false
```

On a new machine or if you need to fetch the latest certificates and profiles, run the command without options like so:

```
fastlane match_pull_all
```

## Tips

Sometimes, React Native can produce cryptic errors... To handle thoses scenarios, you can use the following command:

```
make clean
```
