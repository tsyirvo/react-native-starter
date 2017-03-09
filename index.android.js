import { AppRegistry } from 'react-native';

import Root from './src';

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

AppRegistry.registerComponent('reactNativeStarter', () => Root);
