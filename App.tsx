import React from 'react';
import { StatusBar } from 'react-native';
import codePush from 'react-native-code-push';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { ThemeProvider } from 'styled-components';

import ErrorBoundary from './src/components/errorBoundary';
import { config, getDimensionRatio } from './src/core/constants';
import { initI18n } from './src/i18n/config';
import AppContainer from './src/routes/routes';
import theme from './src/styles/theme';
import StorybookProvider from './storybook/Storybook';

enableScreens();

initI18n();
getDimensionRatio();

const Root = () => (
  <ThemeProvider theme={theme}>
    <StatusBar barStyle="light-content" />

    <ErrorBoundary>
      <StorybookProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <AppContainer />
        </SafeAreaProvider>
      </StorybookProvider>
    </ErrorBoundary>
  </ThemeProvider>
);

const isCodepushEnabled = () =>
  !!(config.android.codepushKey ?? config.ios.codepushKey);

const codePushOptions = {
  checkFrequency: isCodepushEnabled()
    ? codePush.CheckFrequency.ON_APP_RESUME
    : codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.ON_NEXT_SUSPEND,
  minimumBackgroundDuration: 180,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default codePush(codePushOptions)(Root);
