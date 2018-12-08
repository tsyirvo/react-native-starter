import React from 'react';
import { useScreens } from 'react-native-screens';

import AppContainer from 'routes/routes';

useScreens();

const Root = () => <AppContainer />;

export default Root;
