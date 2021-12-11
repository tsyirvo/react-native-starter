import { createTheme, useTheme } from '@shopify/restyle';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import breakpoints from './breakpoints';
import colors from './colors';
import textVariants from './fonts';
import borderRadii from './radius';
import spacing from './spacing';

/* ***** *****  Theme definition  ***** ***** */

export const theme = createTheme({
  colors,
  spacing,
  borderRadii,
  textVariants,
  breakpoints,
  buttonVariants: {
    base: {
      paddingHorizontal: 'global_16',
      paddingVertical: 'global_8',
      borderRadius: 'global_8',
      backgroundColor: 'grey',
    },
    baseDisabled: {
      paddingHorizontal: 'global_16',
      paddingVertical: 'global_8',
      borderRadius: 'global_8',
      backgroundColor: 'red',
    },
  },
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
