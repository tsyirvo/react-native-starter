import { focusManager } from '@tanstack/react-query';
import type { AppStateStatus } from 'react-native';
import { AppState, Platform } from 'react-native';

import { useRunOnMount } from '$shared/hooks';

export const useAppFocusManager = () => {
  useRunOnMount(() => {
    const onAppStateChange = (status: AppStateStatus) => {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
      }
    };

    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => {
      subscription.remove();
    };
  });
};
