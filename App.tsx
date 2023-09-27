import 'react-native-gesture-handler';

import { bootstrapSDKs } from '$core/bootstrapSDKs';

import { RootApp } from './src/App';

import './src/core/i18n';

bootstrapSDKs();

function App() {
  return <RootApp />;
}

export { App };
