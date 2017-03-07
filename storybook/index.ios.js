import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@kadira/react-native-storybook';
const stories = require('./stories');

// import stories
configure(() => {
  return stories;
}, module);

const StorybookUI = getStorybookUI({ port: 7007, host: 'localhost' });

AppRegistry.registerComponent('reactNativeStarter', () => { return StorybookUI; });
