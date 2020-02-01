/* eslint-disable no-undef */

import { AppRegistry } from 'react-native';

import Root from './App.tsx';

import { name as appName } from './app.json';

if (__DEV__) {
  import('react-native-dev-menu')
    .then(DevMenu => {
      DevMenu.addItem('Open Storybook', () => {
        isStorybookVisible = true;

        import('react-native-dev-menu').then(Storybook => {
          AppRegistry.registerComponent(appName, () => Storybook);
        });
      });
    })
    .catch(err => console.log('Loading storybook menu link failed', err));
}

AppRegistry.registerComponent(appName, () => Root);
