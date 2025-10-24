import { StyleSheet, useUnistyles } from 'react-native-unistyles';

interface UseInputStylingProps {
  isFocused: boolean;
  isDisabled: boolean;
  error?: string;
}

export const useInputStyling = ({
  isFocused,
  isDisabled,
  error,
}: UseInputStylingProps) => {
  const { theme } = useUnistyles();

  const getLineBorderColor = () => {
    if (isFocused) return styles.focusedState;

    if (error) return styles.errorState;

    return styles.defaultState;
  };

  const getInputBgColor = () => {
    if (isDisabled) return styles.disabledBg(theme.colors.bg_muted);

    return styles.defaultBg(theme.colors.bg_base);
  };

  return { getLineBorderColor, getInputBgColor };
};

const styles = StyleSheet.create((theme) => ({
  defaultState: {
    borderColor: theme.colors.border_default,
  },
  focusedState: {
    borderColor: theme.colors.border_focus,
  },
  errorState: {
    borderColor: theme.colors.negative,
  },
  defaultBg: (color: string) => ({
    backgroundColor: color,
  }),
  disabledBg: (color: string) => ({
    backgroundColor: color,
  }),
}));
