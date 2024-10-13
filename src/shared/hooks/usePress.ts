import isNil from 'lodash.isnil';
import { useState } from 'react';

import { isPromise } from '$shared/utils/isPromise';

export const usePress = <T>({
  isDisabled,
  onPress,
}: {
  isDisabled?: boolean;
  onPress?: null | ((arg: T) => void) | ((arg: T) => Promise<void>);
}): [((arg: T) => Promise<unknown>) | undefined, boolean] => {
  const [isResolving, setIsResolving] = useState<boolean>(false);

  const handlePress = onPress
    ? async (arg: T) => {
        if (isNil(onPress)) {
          return;
        }

        if (typeof onPress === 'function' && !isResolving && !isDisabled) {
          const returnValue = onPress(arg) as unknown;

          if (isPromise(returnValue)) {
            try {
              setIsResolving(true);
              await returnValue;
            } finally {
              setIsResolving(false);
            }
          }
        }
      }
    : undefined;

  return [handlePress, isResolving];
};
