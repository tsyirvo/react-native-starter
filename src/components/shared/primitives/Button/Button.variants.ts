import theme from '$styles/theme';

const baseStyles = {
  paddingHorizontal: theme.space.medium,
  paddingVertical: theme.space.small,
  borderRadius: theme.radii.medium,
};

const variants = {
  base: {
    backgroundColor: theme.colors.grey,
    ...baseStyles,
  },
  baseDisabled: {
    backgroundColor: theme.colors.grey,
    ...baseStyles,
  },
};

export default variants;
