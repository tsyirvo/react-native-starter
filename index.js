import { AppRegistry } from 'react-native';

import Root from './src/components/root/Root';

// !!!! DO NOT COMMIT with true value !!!
const NETWORK_DEBUG = false;

if (typeof global.self === 'undefined') {
  global.self = global;
}

if (NETWORK_DEBUG) {
  const xhr = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest;

  global.XMLHttpRequest = xhr;
}

AppRegistry.registerComponent('reactNativeStarter', () => Root);
