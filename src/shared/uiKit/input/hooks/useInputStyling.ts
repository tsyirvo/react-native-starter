import { StyleSheet, useUnistyles } from 'react-native-unistyles';

interface UseInputStylingProps {
  error?: string;
  isDisabled: boolean;
  isFocused: boolean;
}

export const useInputStyling = ({
  isFocused,
  isDisabled,
  error,
}: UseInputStylingProps) => {
  const { theme } = useUnistyles();

  const getLineBorderColor = () => {
    if (isFocused) {
      return styles.focusedState;
    }

    if (error) {
      return styles.errorState;
    }

    return styles.defaultState;
  };

  const getInputBgColor = () => {
    if (isDisabled) {
      return styles.disabledBg(theme.colors.bg_muted);
    }

    return styles.defaultBg(theme.colors.bg_base);
  };

  return { getInputBgColor, getLineBorderColor };
};

const styles = StyleSheet.create((theme) => ({
  defaultBg: (color: string) => ({
    backgroundColor: color,
  }),
  defaultState: {
    borderColor: theme.colors.border_default,
  },
  disabledBg: (color: string) => ({
    backgroundColor: color,
  }),
  errorState: {
    borderColor: theme.colors.negative,
  },
  focusedState: {
    borderColor: theme.colors.border_focus,
  },
}));
