import 'react-native-gesture-handler';
import * as Sentry from '@sentry/react-native';

import { RootApp } from './src/App';

function App() {
  return <RootApp />;
}

const AppWithSentry = Sentry.wrap(App);

export { AppWithSentry as App };
