import '@formatjs/intl-getcanonicallocales/polyfill';
import 'intl-pluralrules';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Sentry from '@sentry/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StrictMode, type ErrorInfo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { StackAnimationTypes } from 'react-native-screens';
import Toast from 'react-native-toast-message';

import { AuthContextProvider } from '$domain/contexts';
import { makeAppStyles, theme } from '$domain/theme';
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
import {
  useCheckNetworkStateOnMount,
  useRoutingInstrumentation,
} from '$shared/hooks';

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

  useRoutingInstrumentation();
  useCheckNetworkStateOnMount();
  useAppStateTracking();
  useAppScreenTracking();

  return (
    <StrictMode>
      <StatusBar style="auto" />

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
                  <BottomSheetModalProvider>
                    <KeyboardProvider>
                      <AuthContextProvider>
                        <>
                          <Stack screenOptions={screenOptions} />

                          <Toast config={toastConfig} />

                          <AppUpdateNeeded />

                          <MaintenanceMode />
                        </>
                      </AuthContextProvider>
                    </KeyboardProvider>
                  </BottomSheetModalProvider>
                </Splashscreen>
              </ErrorBoundary>
            </ThemeProvider>
          </ProductTrackingProvider>
        </PersistQueryClientProvider>
      </GestureHandlerRootView>
    </StrictMode>
  );
};

const screenOptions = {
  headerShown: false,
  animation: 'fade' as StackAnimationTypes,
};

const useStyles = makeAppStyles(() => ({
  wrapper: {
    flex: 1,
  },
}));

const RootLayoutWithSentry = Sentry.wrap(RootLayout);

export default RootLayoutWithSentry;
