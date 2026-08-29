import { useState } from 'react';
import type { BlurEvent, FocusEvent } from 'react-native';

interface UseInputFocusProps {
  onBlur?: (event: BlurEvent) => void;
  onFocus?: (event: FocusEvent) => void;
}

export const useInputFocusState = ({ onFocus, onBlur }: UseInputFocusProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: FocusEvent) => {
    setIsFocused(true);

    onFocus?.(event);
  };

  const handleBlur = (event: BlurEvent) => {
    setIsFocused(false);

    onBlur?.(event);
  };

  return {
    isFocused,
    onBlur: handleBlur,
    onFocus: handleFocus,
  };
};
