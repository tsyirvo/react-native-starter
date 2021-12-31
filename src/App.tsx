import { ThemeProvider } from '@shopify/restyle';
import { StatusBar, StyleSheet } from 'react-native';
import codePush from 'react-native-code-push';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import Toast from 'react-native-toast-message';

import * as Monitoring from '$core/monitoring/errorMonitoring';
import toastConfig from '$core/toaster/layouts';
import AppUpdateNeeded from '$pages/AppUpdateNeeded';
import { theme } from '$styles/theme';

import ErrorBoundary from './components/errorBoundary';
import { config, getDimensionRatio } from './core/constants';
import { initI18n } from './i18n/config';
import RootStack from './navigation/navigation';

import Sandbox from '$sandbox';

enableScreens();

initI18n();
getDimensionRatio();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <StatusBar barStyle="light-content" />

    <GestureHandlerRootView style={styles.container}>
      <ErrorBoundary>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <Sandbox>
            <>
              <RootStack />

              <Toast config={toastConfig} />

              <AppUpdateNeeded />
            </>
          </Sandbox>
        </SafeAreaProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  </ThemeProvider>
);

const isCodepushEnabled = () => !!config.codepushKey;

const codePushOptions = {
  checkFrequency: isCodepushEnabled()
    ? codePush.CheckFrequency.ON_APP_RESUME
    : codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.ON_NEXT_SUSPEND,
  minimumBackgroundDuration: 180,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default codePush(codePushOptions)(Monitoring.wrap(App));
