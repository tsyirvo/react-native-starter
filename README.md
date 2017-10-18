# React Native Starter

## The Basics

### Dependencies and installation

You need to have Watchman installed:

```
brew install watchman

```

Install the React Native CLI:

```
npm i - g react-native-cli
```

Install Yarn or have least have version 1.1.0 already installed: 

```
curl -o- -L https://yarnpkg.com/install.sh | bash
```

Install the packages:

```
yarn
```

Eventually link the native libraries:

```
react-native link
```

---

### Running the project

To run the React Native packager:

```
yarn start
```

You can launch the devices form the CLI or using Xcode or Android Studio. Using the CLI, you can use:

For an iPhone 8 in release mode

```
yarn ios
```

For an Android device in release mode

```
yarn android
```

---

## Stack

[React Native](https://facebook.github.io/react-native/)

[Redux](http://redux.js.org/)

[Redux Saga](https://redux-saga.js.org/)

[React Navigation](https://reactnavigation.org/)

[Styled Components](https://www.styled-components.com/)

[React Native Config](https://github.com/luggit/react-native-config)

---

## Tips

Sometimes, React Native can produce cryptic errors... To handle thoses scenarios, you can use the following command:

```
yarn clean-cache
```

And if you are using Xcode clean the project or even the build folder via `Product > Clean`


## Other

The project is using [ESlint](https://eslint.org/) and [Prettier](https://prettier.io/) for code formating, you can run ESlint via the command:

```
yarn lint
```

There is a prepush git hook that run the linting command to abort the push in case of a linting error.