import '@formatjs/intl-getcanonicallocales/polyfill.js';
import 'intl-pluralrules';
import '../infra/i18n';

import * as Sentry from '@sentry/react-native';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ObserveRoot } from 'expo-observe';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { type ErrorInfo, StrictMode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import type { StackAnimationTypes } from 'react-native-screens';
import Toast from 'react-native-toast-message';
import { StyleSheet } from 'react-native-unistyles';

import {
  AuthContextProvider,
  getAuthGuards,
  useAuthContext,
} from '$application/auth';
import { config } from '$domain/constants';
import { SubscriptionContextProvider } from '$features/subscription';
import { useAppFocusManager } from '$infra/api';
import { persistOptions, queryClient } from '$infra/api/queryClient';
import { ErrorMonitoring, ObserveMonitoring } from '$infra/monitoring';
import { ProductTrackingProvider } from '$infra/productTracking';
import { useAppStore } from '$infra/store';
import { toastConfig } from '$infra/toaster';
import {
  AppUpdateNeeded,
  FullscreenErrorBoundary,
  MaintenanceMode,
  NavigationThemeProvider,
  Splashscreen,
} from '$shared/components';
import {
  useAppScreenTracking,
  useAppStateTracking,
  useCheckNetworkStateOnMount,
  useRoutingInstrumentation,
} from '$shared/hooks';

ObserveMonitoring.init();

// Sentry is initialized here so that it runs before Sentry.wrap()
ErrorMonitoring.init();

const onGlobalError = (error: Error, errorInfo: ErrorInfo) => {
  ErrorMonitoring.breadcrumbs({
    data: {
      componentStack: errorInfo,
    },
    level: 'error',
    type: 'error',
  });

  ErrorMonitoring.exception(error);
};

const ProtectedNavigator = () => {
  const { user } = useAuthContext();
  const { isAnonymous, isAuthenticated } = getAuthGuards(user);
  const isBootstrappingApplication = useAppStore(
    (state) => state.isBootstrappingApplication,
  );

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Protected guard={!isBootstrappingApplication}>
        <Stack.Protected guard={config.isStorybookEnabled}>
          <Stack.Screen name="Storybook" />
        </Stack.Protected>

        <Stack.Protected guard={isAnonymous}>
          <Stack.Screen name="Login" />
        </Stack.Protected>

        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(protected)/(tabs)" />
        </Stack.Protected>
      </Stack.Protected>
    </Stack>
  );
};

const RootLayout = () => {
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
                <KeyboardProvider>
                  <AuthContextProvider>
                    <SubscriptionContextProvider>
                      <NavigationThemeProvider>
                        <ProtectedNavigator />
                      </NavigationThemeProvider>

                      <Toast config={toastConfig} />

                      <AppUpdateNeeded />

                      <MaintenanceMode />
                    </SubscriptionContextProvider>
                  </AuthContextProvider>
                </KeyboardProvider>
              </Splashscreen>
            </ErrorBoundary>
          </ProductTrackingProvider>
        </PersistQueryClientProvider>
      </GestureHandlerRootView>
    </StrictMode>
  );
};

const screenOptions = {
  animation: 'fade' as StackAnimationTypes,
  headerShown: false,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

const RootLayoutWithSentry = Sentry.wrap(RootLayout);

export default ObserveRoot.wrap(RootLayoutWithSentry);
