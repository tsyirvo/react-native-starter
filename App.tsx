import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { enableScreens } from 'react-native-screens';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import codePush from 'react-native-code-push';

import AppContainer from 'routes/routes';

import theme from 'styles/theme';

import { getRatio } from '@utils/dimensions';

import StorybookProvider from './storybook/Storybook';

enableScreens();
getRatio();

const Root = (): ReactElement => (
  <StorybookProvider>
    <ThemeProvider theme={theme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppContainer />
      </SafeAreaProvider>
    </ThemeProvider>
  </StorybookProvider>
);

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_SUSPEND,
  minimumBackgroundDuration: 180,
};

export default codePush(codePushOptions)(Root);
