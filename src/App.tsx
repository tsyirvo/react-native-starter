import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';

import { bootstrapExternalSdks } from '$core/bootstrapExternalSdks';
import { RootStack } from '$core/navigation';
import { Providers } from '$core/providers/Providers';
import { toastConfig } from '$core/toaster';
import { AppUpdateNeeded } from '$shared/components/AppUpdateNeeded';
import { MaintenanceMode } from '$shared/components/MaintenanceMode';
import { useCheckNetworkStateOnMount } from '$shared/hooks/useCheckNetworkStateOnMount';

import './core/i18n';

bootstrapExternalSdks();

const App = () => {
  useCheckNetworkStateOnMount();

  return (
    <>
      <StatusBar barStyle="light-content" />

      <Providers>
        <>
          <RootStack />

          <Toast config={toastConfig} />

          <AppUpdateNeeded />

          <MaintenanceMode />
        </>
      </Providers>
    </>
  );
};

export { App as RootApp };
