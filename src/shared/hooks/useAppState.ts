import { useCallback, useEffect, useState } from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState } from 'react-native';

export const useAppState = (callback: () => void) => {
  const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      const isComingToForeground =
        nextAppState === 'active' && appState !== 'active';

      if (isComingToForeground) {
        callback();
      }

      setAppState(nextAppState);
    },
    [appState, callback],
  );

  useEffect(() => {
    const listener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      listener.remove();
    };
  }, [appState, handleAppStateChange]);
};
