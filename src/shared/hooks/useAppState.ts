import { useCallback, useEffect, useState } from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState } from 'react-native';

export const useAppState = ({
  onComingToForeground,
  onGoingToBackground,
}: {
  onComingToForeground: () => void;
  onGoingToBackground: () => void;
}) => {
  const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      const isComingToForeground =
        nextAppState === 'active' && appState !== 'active';
      const isGoingToBackground =
        nextAppState === 'background' && appState !== 'background';

      if (isComingToForeground) {
        onComingToForeground();
      }

      if (isGoingToBackground) {
        onGoingToBackground();
      }

      setAppState(nextAppState);
    },
    [appState, onComingToForeground, onGoingToBackground],
  );

  useEffect(() => {
    const listener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      listener.remove();
    };
  }, [appState, handleAppStateChange]);
};
