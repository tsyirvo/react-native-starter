import type { TextProps as RNTextProps, TextStyle } from 'react-native';
import { Text as RNText } from 'react-native';
import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

import type { ThemeColors } from '$domain/theme';

/* ***** *****  Types  ***** ***** */

interface TextProps extends RNTextProps, UnistylesVariants<typeof styles> {
  color?: ThemeColors;
  testID?: string;
  textAlign?: TextStyle['textAlign'];
}

/* ***** *****  Component  ***** ***** */

export const Text = ({
  variant = 'regular',
  color = 'content_primary',
  textAlign,
  testID,
  style,
  ...rest
}: TextProps) => {
  styles.useVariants({ variant });

  const accessibilityLabel =
    typeof rest.children === 'string' ? rest.children : undefined;

  return (
    <RNText
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="text"
      style={[styles.text({ color }), textAlign && { textAlign }, style]}
      testID={testID}
      {...rest}
    />
  );
};

/* ***** *****  Styles  ***** ***** */

const styles = StyleSheet.create((theme) => ({
  text: (props: { color: ThemeColors }) => ({
    color: theme.colors[props.color],
    variants: {
      variant: {
        large: {
          fontFamily: theme.fontFamily.bold,
          fontSize: theme.fontSizes.large,
          lineHeight: theme.lineHeight.large,
        },
        medium: {
          fontFamily: theme.fontFamily.regular,
          fontSize: theme.fontSizes.medium,
          lineHeight: theme.lineHeight.medium,
        },
        regular: {
          fontFamily: theme.fontFamily.regular,
          fontSize: theme.fontSizes.regular,
          lineHeight: theme.lineHeight.regular,
        },
        small: {
          fontFamily: theme.fontFamily.light,
          fontSize: theme.fontSizes.small,
          lineHeight: theme.lineHeight.small,
        },
        xLarge: {
          fontFamily: theme.fontFamily.bold,
          fontSize: theme.fontSizes.xLarge,
          lineHeight: theme.lineHeight.xLarge,
        },
      },
    },
  }),
}));
