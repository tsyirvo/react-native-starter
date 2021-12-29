import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import { ErrorMonitoring } from '$core/monitoring';

import { name as appName } from './app.json';
import Root from './src/App.tsx';

ErrorMonitoring.init();

AppRegistry.registerComponent(appName, () => Root);
