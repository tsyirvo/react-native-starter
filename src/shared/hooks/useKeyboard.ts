import { useCallback, useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react-native';
import { Keyboard } from 'react-native';

import { IS_IOS } from '$core/constants';

type UseKeyboardArguments = {
  onKeyboardShow?: (e?: KeyboardEvent) => void;
  onKeyboardHide?: (e?: KeyboardEvent) => void;
};

const initialHeight = 0;

export const useKeyboard = (props?: UseKeyboardArguments) => {
  const [hasKeyboard, setHasKeyboard] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(initialHeight);

  const showKeyboard = useCallback(
    (e: KeyboardEvent) => {
      if (!hasKeyboard) {
        props?.onKeyboardShow?.(e);
      }

      setHasKeyboard(true);
      setKeyboardHeight(e.endCoordinates.height);
    },
    [props, hasKeyboard],
  );

  const hideKeyboard = useCallback(
    (e: KeyboardEvent) => {
      if (hasKeyboard) {
        props?.onKeyboardHide?.(e);
      }

      setHasKeyboard(false);
    },
    [props, hasKeyboard],
  );

  useEffect(() => {
    const showListener = Keyboard.addListener(
      IS_IOS ? 'keyboardWillShow' : 'keyboardDidShow',
      showKeyboard,
    );
    const hideListener = Keyboard.addListener(
      IS_IOS ? 'keyboardWillHide' : 'keyboardDidHide',
      hideKeyboard,
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [hideKeyboard, showKeyboard]);

  return { hasKeyboard, keyboardHeight };
};
