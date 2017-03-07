import { AppRegistry } from 'react-native';

/* React Native debugging network
https://github.com/jhen0409/react-native-debugger#debugging-tips
*/

// !!!! DO NOT COMMIT with true value !!!
const NETWORK_DEBUG = false;

if (NETWORK_DEBUG) {
  const xhr = global.originalXMLHttpRequest ?
    global.originalXMLHttpRequest :
    global.XMLHttpRequest;

  global.XMLHttpRequest = xhr;
}

// Component
import Root from './src/index.js';

// eslint-disable-next-line no-console
// console.ignoredYellowBox = [];

// eslint-disable-next-line arrow-body-style
AppRegistry.registerComponent('reactNativeStarter', () => Root);
