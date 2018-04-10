# React Native Starter

## The basics

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

### Running the project

To run the app on a specific simulator, and also launch the React Native packager:

```
yarn start
```

## Stack

[React Native](https://facebook.github.io/react-native/)

[Redux](http://redux.js.org/)

[Redux Observable](https://redux-observable.js.org/)

[React Navigation](https://reactnavigation.org/)

[Styled Components](https://www.styled-components.com/)

[React Native Config](https://github.com/luggit/react-native-config)

[Lottie](https://github.com/airbnb/lottie-react-native/)


## Tips

Sometimes, React Native can produce cryptic errors... To handle thoses scenarios, you can use the following command:

```
yarn clean-cache
```

And if you are using Xcode clean the project or even the build folder via `Product > Clean`

You can auto generate some files for common tasks such as creating a new component with `yarn createComponent` or add a new reducer and actions with `yarn createReducer`.


## Other

The project is using [ESlint](https://eslint.org/) and [Prettier](https://prettier.io/) for code formating, you can run ESlint via the command:

```
yarn lint
```

There is a precommit git hook that run the linting command to abort the commit in case of a linting error.