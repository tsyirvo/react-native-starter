import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import Root from './App.tsx';

AppRegistry.registerComponent(appName, () => Root);
