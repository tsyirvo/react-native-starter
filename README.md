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

### Running the project

To launch the React Native packager:

```
yarn start
```

Then for a simulator:

```
react-native run-<PLATFORM>
```

## Stack

[React Native](https://facebook.github.io/react-native/)

[React Navigation](https://reactnavigation.org/)

[Styled System](https://jxnblk.com/styled-system/)

[React Native Config](https://github.com/luggit/react-native-config)

[Lottie](https://github.com/airbnb/lottie-react-native/)

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
