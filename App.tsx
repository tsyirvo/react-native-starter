import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { enableScreens } from 'react-native-screens';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

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

export default Root;
