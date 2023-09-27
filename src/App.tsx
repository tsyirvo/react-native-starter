import { ThemeProvider } from '@shopify/restyle';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { RootStack } from '$core/navigation';
import { theme } from '$core/theme';
import { toastConfig } from '$core/toaster';
import { Sandbox } from '$features/sandbox';
import { AppUpdateNeeded } from '$shared/components/AppUpdateNeeded';
import { ErrorBoundary } from '$shared/components/ErrorBoundary';
import { MaintenanceMode } from '$shared/components/MaintenanceMode';
import { Splashscreen } from '$shared/components/splashscreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App() {
  return (
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
}

export { App as RootApp };
