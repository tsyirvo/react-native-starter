const fontFamily = {
  light: 'WorkSans-Light',
  regular: 'WorkSans-Regular',
  medium: 'WorkSans-Medium',
  bold: 'WorkSans-Bold',
};

export const fontSizes = {
  small: 12,
  medium: 14,
  regular: 16,
  large: 24,
  xLarge: 32,
};

const lineHeight = {
  small: 17,
  medium: 24,
  regular: 33,
  large: 45,
};

const textVariants = {
  small: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    lineHeight: lineHeight.small,
  },
  medium: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.regular,
    lineHeight: lineHeight.medium,
  },
  regular: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    lineHeight: lineHeight.medium,
  },
  large: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.large,
    lineHeight: lineHeight.medium,
  },
  xLarge: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.xLarge,
    lineHeight: lineHeight.large,
  },
};

export type FontSizes = keyof typeof fontSizes;

export default textVariants;
