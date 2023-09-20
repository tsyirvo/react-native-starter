import 'react-native-gesture-handler';

import { bootstrapSDKs } from '$core/bootstrapSDKs';

import Root from './src/App';

import './src/core/i18n';

bootstrapSDKs();

const App = () => <Root />;

export default App;
