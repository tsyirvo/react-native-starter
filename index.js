/* eslint-disable @typescript-eslint/no-floating-promises */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import Analytics from '$core/analytics';
import { ErrorMonitoring } from '$core/monitoring';

import { name as appName } from './app.json';
import Root from './src/App.tsx';

ErrorMonitoring.init();
Analytics.init();

AppRegistry.registerComponent(appName, () => Root);
