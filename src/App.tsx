import { ThemeProvider } from '@shopify/restyle';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import type { ErrorInfo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { persistOptions, queryClient } from '$core/api/queryClient';
import { bootstrapExternalSdks } from '$core/bootstrapExternalSdks';
import { FeatureFlagsProvider } from '$core/featureFlags';
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

bootstrapExternalSdks();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
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
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={persistOptions}
        >
          <ErrorBoundary
            FallbackComponent={FullscreenErrorBoundary}
            onError={onGlobalError}
          >
            <Splashscreen>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <KeyboardProvider>
                  <Sandbox>
                    <FeatureFlagsProvider>
                      <>
                        <RootStack />

                        <Toast config={toastConfig} />

                        <AppUpdateNeeded />

                        <MaintenanceMode />
                      </>
                    </FeatureFlagsProvider>
                  </Sandbox>
                </KeyboardProvider>
              </SafeAreaProvider>
            </Splashscreen>
          </ErrorBoundary>
        </PersistQueryClientProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export { App as RootApp };
