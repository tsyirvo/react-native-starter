import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

import { Logger } from '$infra/logger';

export const useIsScreenReaderEnabled = () => {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);

  useEffect(() => {
    let isMounted = true;

    AccessibilityInfo.isScreenReaderEnabled()
      .then((isEnabled) => {
        if (isMounted) {
          setIsScreenReaderEnabled(isEnabled);
        }
      })
      .catch((error: unknown) => {
        Logger.error({
          error,
          message: 'Failed to read the screen reader state',
        });
      });

    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setIsScreenReaderEnabled,
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  return isScreenReaderEnabled;
};
