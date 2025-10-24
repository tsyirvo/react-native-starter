/* eslint-disable react/jsx-props-no-spreading */

import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

import type { ThemeColors } from '$domain/newTheme/unistyles';

/* ***** *****  Types  ***** ***** */

interface TextProps extends RNTextProps, UnistylesVariants<typeof styles> {
  testID?: string;
  color?: ThemeColors;
}

/* ***** *****  Component  ***** ***** */

export const Text = ({
  variant = 'regular',
  color = 'content_primary',
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
      testID={testID}
      style={[styles.text({ color }), style]}
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
        small: {
          fontFamily: theme.fontFamily.light,
          fontSize: theme.fontSizes.small,
          lineHeight: theme.lineHeight.small,
        },
        regular: {
          fontFamily: theme.fontFamily.regular,
          fontSize: theme.fontSizes.regular,
          lineHeight: theme.lineHeight.regular,
        },
        medium: {
          fontFamily: theme.fontFamily.regular,
          fontSize: theme.fontSizes.medium,
          lineHeight: theme.lineHeight.medium,
        },
        large: {
          fontFamily: theme.fontFamily.bold,
          fontSize: theme.fontSizes.large,
          lineHeight: theme.lineHeight.large,
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
