import { AppRegistry } from 'react-native';

import Root from './src/index';

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

// eslint-disable-next-line arrow-body-style
AppRegistry.registerComponent('reactNativeStarter', () => Root);
