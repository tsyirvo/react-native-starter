import * as Sentry from '@sentry/react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

import { bootstrapExternalSdks } from '$core/bootstrapExternalSdks';
import { useAppScreenTracking } from '$core/navigation/hooks/useAppScreenTracking';
import { useAppStateTracking } from '$core/navigation/hooks/useAppStateTracking';
import { Providers } from '$core/providers/Providers';
import { colors } from '$core/theme';
import { toastConfig } from '$core/toaster';
import { AppUpdateNeeded } from '$shared/components/AppUpdateNeeded';
import { MaintenanceMode } from '$shared/components/MaintenanceMode';
import { useCheckNetworkStateOnMount } from '$shared/hooks/useCheckNetworkStateOnMount';
import 'react-native-gesture-handler';

import '../core/i18n';

bootstrapExternalSdks();

const RootLayout = () => {
  useCheckNetworkStateOnMount();
  useAppStateTracking();
  useAppScreenTracking();

  return (
    <>
      <StatusBar style="light" />

      <Providers>
        <>
          <Stack screenOptions={globalScreenOptions} />

          <Toast config={toastConfig} />

          <AppUpdateNeeded />

          <MaintenanceMode />
        </>
      </Providers>
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

const RootLayoutWithSentry = Sentry.wrap(RootLayout);

export default RootLayoutWithSentry;
