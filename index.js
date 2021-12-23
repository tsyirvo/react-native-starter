import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import errorMonitoring from '$core/errorMonitoring';

import { name as appName } from './app.json';
import Root from './src/App.tsx';

errorMonitoring.init();

AppRegistry.registerComponent(appName, () => Root);
