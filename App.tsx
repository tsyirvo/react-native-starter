import React from 'react';
import { StatusBar } from 'react-native';
import codePush from 'react-native-code-push';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { ThemeProvider } from 'styled-components';

import theme from '$styles/theme';
import AppContainer from '$routes/routes';
import ErrorBoundary from '$components/errorBoundary';
import { initI18n } from '$i18n/config';
import { config, getDimensionRatio } from '$core/constants';

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
  !!(config.android.codepushKey || config.ios.codepushKey);

const codePushOptions = {
  checkFrequency: isCodepushEnabled()
    ? codePush.CheckFrequency.ON_APP_RESUME
    : codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.ON_NEXT_SUSPEND,
  minimumBackgroundDuration: 180,
};

export default codePush(codePushOptions)(Root);
