import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@kadira/react-native-storybook'; // eslint-disable-line

const stories = require('./stories');

// import stories
configure(() => stories, module);

const StorybookUI = getStorybookUI({ port: 7007, host: 'localhost' });

AppRegistry.registerComponent('reactNativeStarter', () => StorybookUI);
