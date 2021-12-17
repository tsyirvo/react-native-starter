import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import Root from './src/App.tsx';

AppRegistry.registerComponent(appName, () => Root);
