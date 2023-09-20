import { ThemeProvider } from '@shopify/restyle';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import Splashscreen from '$components/splashscreen/Splashscreen';
import { bootstrapSDKs } from '$core/bootstrapSDKs/bootstrapSDKs';
import toastConfig from '$core/toaster/layouts';
import AppUpdateNeeded from '$pages/AppUpdateNeeded';
import MaintenanceMode from '$pages/MaintenanceMode';
import { theme } from '$styles/theme';

import ErrorBoundary from './components/errorBoundary';
import RootStack from './navigation/navigation';

import Sandbox from '$sandbox';

import './i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

bootstrapSDKs();

const App = () => (
  <ThemeProvider theme={theme}>
    <StatusBar barStyle="light-content" />

    <GestureHandlerRootView style={styles.container}>
      <Splashscreen>
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
      </Splashscreen>
    </GestureHandlerRootView>
  </ThemeProvider>
);

export default App;
