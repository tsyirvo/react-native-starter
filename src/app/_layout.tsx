import '@formatjs/intl-getcanonicallocales/polyfill';
import 'intl-pluralrules';
import '../infra/i18n';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Sentry from '@sentry/react-native';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StrictMode, type ErrorInfo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { StackAnimationTypes } from 'react-native-screens';
import Toast from 'react-native-toast-message';
import { StyleSheet } from 'react-native-unistyles';

import { config } from '$domain/constants';
import { AuthContextProvider } from '$domain/contexts';
import { SubscriptionContextProvider } from '$domain/contexts/subscriptionContext';
import { useAppFocusManager } from '$infra/api';
import { persistOptions, queryClient } from '$infra/api/queryClient';
import { ErrorMonitoring } from '$infra/monitoring';
import { ProductTrackingProvider } from '$infra/productTracking';
import { useAppStore } from '$infra/store';
import { toastConfig } from '$infra/toaster';
import {
  AppUpdateNeeded,
  FullscreenErrorBoundary,
  MaintenanceMode,
  Splashscreen,
} from '$shared/components';
import {
  useAppScreenTracking,
  useAppStateTracking,
  useCheckNetworkStateOnMount,
  useRoutingInstrumentation,
} from '$shared/hooks';

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
  const isUserLoggedIn = useAppStore((state) => state.isUserLoggedIn);
  const isBootstrappingApplication = useAppStore(
    (state) => state.isBootstrappingApplication,
  );

  useRoutingInstrumentation();
  useCheckNetworkStateOnMount();
  useAppStateTracking();
  useAppScreenTracking();
  useAppFocusManager();

  return (
    <StrictMode>
      <StatusBar style="auto" />

      <GestureHandlerRootView style={styles.wrapper}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={persistOptions}
        >
          <ProductTrackingProvider>
            <ErrorBoundary
              FallbackComponent={FullscreenErrorBoundary}
              onError={onGlobalError}
            >
              <Splashscreen>
                <BottomSheetModalProvider>
                  <KeyboardProvider>
                    <AuthContextProvider>
                      <SubscriptionContextProvider>
                        <>
                          <Stack screenOptions={screenOptions}>
                            <Stack.Protected
                              guard={!isBootstrappingApplication}
                            >
                              <Stack.Protected
                                guard={config.isStorybookEnabled}
                              >
                                <Stack.Screen name="Storybook" />
                              </Stack.Protected>

                              <Stack.Protected guard={!isUserLoggedIn}>
                                <Stack.Screen name="Login" />
                              </Stack.Protected>

                              <Stack.Protected guard={isUserLoggedIn}>
                                <Stack.Screen name="(protected)/(tabs)" />
                              </Stack.Protected>
                            </Stack.Protected>
                          </Stack>

                          <Toast config={toastConfig} />

                          <AppUpdateNeeded />

                          <MaintenanceMode />
                        </>
                      </SubscriptionContextProvider>
                    </AuthContextProvider>
                  </KeyboardProvider>
                </BottomSheetModalProvider>
              </Splashscreen>
            </ErrorBoundary>
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

const RootLayoutWithSentry = Sentry.wrap(RootLayout);

export default RootLayoutWithSentry;
