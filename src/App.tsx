import { ThemeProvider } from '@shopify/restyle';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import Toast from 'react-native-toast-message';

import { syncCodepush } from '$core/codepush';
import * as Monitoring from '$core/monitoring/errorMonitoring';
import toastConfig from '$core/toaster/layouts';
import useRunOnMount from '$hooks/useRunOnMount';
import AppUpdateNeeded from '$pages/AppUpdateNeeded';
import MaintenanceMode from '$pages/MaintenanceMode';
import { theme } from '$styles/theme';

import ErrorBoundary from './components/errorBoundary';
import { getDimensionRatio } from './core/constants';
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

const App = () => {
  useRunOnMount(() => {
    syncCodepush().catch((error) => {
      console.log('Codepush sync error: ', error);
    });
  });

  return (
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
                <MaintenanceMode />
              </>
            </Sandbox>
          </SafeAreaProvider>
        </ErrorBoundary>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default Monitoring.wrap(App);
