/* eslint-disable @typescript-eslint/no-floating-promises */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import Analytics from '$core/analytics';
import FeatureFlags from '$core/featureFlags';
import { ErrorMonitoring } from '$core/monitoring';

import App from './src/App.tsx';

ErrorMonitoring.init();
Analytics.init();
FeatureFlags.init();

AppRegistry.registerComponent('rnStarter', () => App);
