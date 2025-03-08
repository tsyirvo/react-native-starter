import * as Sentry from '@sentry/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type { ErrorInfo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';

import { colors, makeAppStyles, theme } from '$domain/theme';
import {
  useAppScreenTracking,
  useAppStateTracking,
} from '$features/navigation';
import { persistOptions, queryClient } from '$infra/api/queryClient';
import { ErrorMonitoring } from '$infra/monitoring';
import { ProductTrackingProvider } from '$infra/productTracking';
import { toastConfig } from '$infra/toaster';
import {
  AppUpdateNeeded,
  FullscreenErrorBoundary,
  MaintenanceMode,
  Splashscreen,
} from '$shared/components';
import { useCheckNetworkStateOnMount } from '$shared/hooks';

import '../infra/i18n';

// Sentry is initialized here so that it runs before Sentry.wrap()
ErrorMonitoring.init();

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

const RootLayout = () => {
  const styles = useStyles();

  useCheckNetworkStateOnMount();
  useAppStateTracking();
  useAppScreenTracking();

  return (
    <>
      <StatusBar style="light" />

      <GestureHandlerRootView style={styles.wrapper}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={persistOptions}
        >
          <ProductTrackingProvider>
            <ThemeProvider theme={theme}>
              <ErrorBoundary
                FallbackComponent={FullscreenErrorBoundary}
                onError={onGlobalError}
              >
                <Splashscreen>
                  <KeyboardProvider>
                    <>
                      <Stack screenOptions={globalScreenOptions} />

                      <Toast config={toastConfig} />

                      <AppUpdateNeeded />

                      <MaintenanceMode />
                    </>
                  </KeyboardProvider>
                </Splashscreen>
              </ErrorBoundary>
            </ThemeProvider>
          </ProductTrackingProvider>
        </PersistQueryClientProvider>
      </GestureHandlerRootView>
    </>
  );
};

const globalScreenOptions = {
  gestureEnabled: true,
  headerTintColor: colors.clear,
  headerStyle: {
    backgroundColor: colors.duller,
  },
};

const useStyles = makeAppStyles(() => ({
  wrapper: {
    flex: 1,
  },
}));

const RootLayoutWithSentry = Sentry.wrap(RootLayout);

export default RootLayoutWithSentry;
