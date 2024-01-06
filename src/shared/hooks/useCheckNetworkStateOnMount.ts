import * as Network from 'expo-network';
import { useTranslation } from 'react-i18next';

import { ErrorMonitoring } from '$core/monitoring';
import { Toaster } from '$core/toaster';
import { sleep } from '$shared/utils/sleep';

import { useRunOnMount } from './useRunOnMount';

const ONE_SECOND = 1000;

export const useCheckNetworkStateOnMount = () => {
  const { t } = useTranslation('appConfig');

  const checkNetworkState = async () => {
    await sleep(ONE_SECOND);
    const { isInternetReachable } = await Network.getNetworkStateAsync();

    if (!isInternetReachable) {
      Toaster.show({
        type: 'info',
        text1: t('networkStateCheck.title'),
        text2: t('networkStateCheck.message'),
      });
    }
  };

  useRunOnMount(() => {
    checkNetworkState().catch(() => {
      ErrorMonitoring.breadcrumbs({
        category: 'network',
        type: 'network',
        message: 'Failed to check network state',
      });
    });
  });
};
