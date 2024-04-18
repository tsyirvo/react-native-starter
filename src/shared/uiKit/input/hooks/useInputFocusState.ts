import { useState } from 'react';
import type {
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

type OnFocusState = (
  event: NativeSyntheticEvent<TextInputFocusEventData>,
) => void;

export const useInputFocusState = ({
  onFocus,
  onBlur,
}: {
  onBlur?: OnFocusState;
  onFocus?: OnFocusState;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);

    onFocus?.(args);
  };

  const handleBlur = (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);

    onBlur?.(args);
  };

  return {
    isFocused,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };
};
