/* eslint-disable @typescript-eslint/no-floating-promises */

import 'react-native-gesture-handler';

import Analytics from '$core/analytics';
// import FeatureFlags from '$core/featureFlags';
import { ErrorMonitoring } from '$core/monitoring';

import Root from './src/App';

ErrorMonitoring.init();
Analytics.init();
// FeatureFlags.init();

const App = () => <Root />;

export default App;
