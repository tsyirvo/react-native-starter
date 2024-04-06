import 'react-native-gesture-handler';
import * as Sentry from '@sentry/react-native';

import { RootApp } from './src/App';

const App = () => <RootApp />;

const AppWithSentry = Sentry.wrap(App);

export { AppWithSentry as App };
