/* eslint-disable react/jsx-props-no-spreading */

import { ThemeProvider } from '@shopify/restyle';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import type { ErrorInfo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { persistOptions, queryClient } from '$core/api/queryClient';
import { FeatureFlagsProvider } from '$core/featureFlags';
import { ErrorMonitoring } from '$core/monitoring';
import { theme } from '$core/theme';
import { Sandbox } from '$features/sandbox';
import { FullscreenErrorBoundary } from '$shared/components/FullscreenErrorBoundary';
import { Splashscreen } from '$shared/components/splashscreen';

type ProvidersProps = {
  children: React.JSX.Element;
};

export const Providers = ({ children }: ProvidersProps) => {
  return providers.reduceRight((child, provider) => {
    // @ts-expect-error: TS needs to map each component to the appropriate props
    return <provider.component {...provider.props}>{child}</provider.component>;
  }, children);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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

const providers = [
  {
    component: ThemeProvider,
    props: { theme } as React.ComponentProps<typeof ThemeProvider>,
  },
  {
    component: GestureHandlerRootView,
    props: { style: styles.container } as React.ComponentProps<
      typeof GestureHandlerRootView
    >,
  },
  {
    component: PersistQueryClientProvider,
    props: { client: queryClient, persistOptions } as React.ComponentProps<
      typeof PersistQueryClientProvider
    >,
  },
  {
    component: ErrorBoundary,
    props: {
      FallbackComponent: FullscreenErrorBoundary,
      onError: onGlobalError,
    } as React.ComponentProps<typeof ErrorBoundary>,
  },
  {
    component: Splashscreen,
  },
  {
    component: KeyboardProvider,
  },
  {
    component: Sandbox,
  },
  {
    component: FeatureFlagsProvider,
  },
];
