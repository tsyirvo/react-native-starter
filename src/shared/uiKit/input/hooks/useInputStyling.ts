import { makeAppStyles } from '$domain/theme';

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
  const styles = useStyles();

  const getLineBorderColor = () => {
    if (isFocused) return styles.focusedState;

    if (error) return styles.errorState;

    return styles.defaultState;
  };

  const getInputBgColor = () => {
    if (isDisabled) return styles.disabledBg;

    return styles.defaultBg;
  };

  return { getLineBorderColor, getInputBgColor };
};

const useStyles = makeAppStyles(({ colors }) => ({
  defaultState: {
    borderColor: colors.border_default,
  },
  focusedState: {
    borderColor: colors.border_focus,
  },
  errorState: {
    borderColor: colors.negative,
  },
  defaultBg: {
    backgroundColor: colors.bg_base,
  },
  disabledBg: {
    backgroundColor: colors.bg_muted,
  },
}));
