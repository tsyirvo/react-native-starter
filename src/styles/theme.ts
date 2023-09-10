import { createTheme, useTheme } from '@shopify/restyle';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import colors from './colors';
import textVariants from './fonts';
import borderRadii from './radius';
import spacing from './spacing';
import buttonVariants from './variants';

/* ***** *****  Theme definition  ***** ***** */

export const theme = createTheme({
  colors,
  spacing,
  borderRadii,
  textVariants,
  breakpoints: {},
  buttonVariants,
});

/* ***** *****  Theme utilities  ***** ***** */

export const useAppTheme = () => useTheme<Theme>();

export const makeAppStyles =
  <T extends NamedStyles<T>>(styles: (appTheme: Theme) => T) =>
  () => {
    const restyleTheme = useAppTheme();

    return styles(restyleTheme);
  };

/* ***** *****  Types  ***** ***** */

export type Theme = typeof theme;

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
