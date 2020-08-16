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

import Storybook from './storybook/Storybook';

enableScreens();
getRatio();

const Root = (): ReactElement => (
  <Storybook>
    <ThemeProvider theme={theme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppContainer />
      </SafeAreaProvider>
    </ThemeProvider>
  </Storybook>
);

export default Root;
