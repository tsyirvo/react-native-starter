import React from 'react';
import codePush from 'react-native-code-push';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';

import LocaleProvider from '$components/contexts/LocaleProvider';
import ErrorBoundary from '$components/errorBoundary';
import AppContainer from '$routes/routes';
import theme from '$styles/theme';
import config from '$utils/config';
import { getRatio } from '$utils/dimensions';

import './src/i18n';
import StorybookProvider from './storybook/Storybook';

enableScreens();
getRatio();

const Root = () => (
  <ThemeProvider theme={theme}>
    <StatusBar barStyle="light-content" />

    <LocaleProvider>
      <ErrorBoundary>
        <StorybookProvider>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <AppContainer />
          </SafeAreaProvider>
        </StorybookProvider>
      </ErrorBoundary>
    </LocaleProvider>
  </ThemeProvider>
);

const isCodepushEnabled = () =>
  !!(config.androidCodepushKey || config.iosCodepushKey);

const codePushOptions = {
  checkFrequency: isCodepushEnabled()
    ? codePush.CheckFrequency.ON_APP_RESUME
    : codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.ON_NEXT_SUSPEND,
  minimumBackgroundDuration: 180,
};

export default codePush(codePushOptions)(Root);
