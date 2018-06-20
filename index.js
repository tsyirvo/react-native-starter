import { AppRegistry, YellowBox } from 'react-native';

import Root from './src/components/root/Root';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

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
