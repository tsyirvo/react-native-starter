export const fontFamily = {
  light: 'WorkSans-Light',
  regular: 'WorkSans-Regular',
  medium: 'WorkSans-Medium',
  bold: 'WorkSans-Bold',
};

export const fontSizes = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 24,
  xLarge: 32,
};

const lineHeight = {
  small: 15,
  regular: 17,
  medium: 22,
  large: 29,
  xLarge: 38,
};

export const textVariants = {
  small: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    lineHeight: lineHeight.small,
  },
  regular: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.regular,
    lineHeight: lineHeight.regular,
  },
  medium: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    lineHeight: lineHeight.medium,
  },
  large: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.large,
    lineHeight: lineHeight.large,
  },
  xLarge: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.xLarge,
    lineHeight: lineHeight.xLarge,
  },
};

export type FontSizes = keyof typeof fontSizes;
