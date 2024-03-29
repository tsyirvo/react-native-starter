import { ThemeProvider } from '@shopify/restyle';
import type { ErrorInfo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { bootstrapSDKs } from '$core/bootstrapSDKs';
import { ErrorMonitoring } from '$core/monitoring';
import { RootStack } from '$core/navigation';
import { theme } from '$core/theme';
import { toastConfig } from '$core/toaster';
import { Sandbox } from '$features/sandbox';
import { AppUpdateNeeded } from '$shared/components/AppUpdateNeeded';
import { FullscreenErrorBoundary } from '$shared/components/FullscreenErrorBoundary';
import { MaintenanceMode } from '$shared/components/MaintenanceMode';
import { Splashscreen } from '$shared/components/splashscreen';
import { useCheckNetworkStateOnMount } from '$shared/hooks/useCheckNetworkStateOnMount';

import './core/i18n';

bootstrapSDKs();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App() {
  useCheckNetworkStateOnMount();

  const onGlobalError = (error: Error, errorInfo: ErrorInfo) => {
    ErrorMonitoring.breadcrumbs({
      type: 'error',
      level: 'error',
      data: {
        componentStack: errorInfo,
      },
    });

    ErrorMonitoring.exception(error);
  };

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />

      <GestureHandlerRootView style={styles.container}>
        <ErrorBoundary
          FallbackComponent={FullscreenErrorBoundary}
          onError={onGlobalError}
        >
          <Splashscreen>
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
          </Splashscreen>
        </ErrorBoundary>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

export { App as RootApp };
