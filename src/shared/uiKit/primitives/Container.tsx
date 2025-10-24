import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { SpacingProps } from './primitiveLayout.types';

/* ***** *****  Types  ***** ***** */

interface ContainerStyleProps extends SpacingProps {
  flex: number;
}

interface ContainerProps
  extends Omit<ViewProps, keyof Omit<ContainerStyleProps, 'flex'>>,
    SpacingProps {
  flex?: number;
}

/* ***** *****  Component  ***** ***** */

export const Container = ({
  flex = 1,
  style,
  children,
  testID,
  onLayout,
  ...spacingProps
}: ContainerProps) => (
  <View
    style={[styles.container({ flex, ...spacingProps }), style]}
    testID={testID}
    onLayout={onLayout}
  >
    {children}
  </View>
);

/* ***** *****  Styles  ***** ***** */

const styles = StyleSheet.create((theme) => ({
  container: (props: ContainerStyleProps) => ({
    flex: props.flex,
    gap: props.gap ? theme.spacing[props.gap] : undefined,
    padding: props.p ? theme.spacing[props.p] : undefined,
    paddingHorizontal: props.px ? theme.spacing[props.px] : undefined,
    paddingVertical: props.py ? theme.spacing[props.py] : undefined,
    paddingTop: props.pt ? theme.spacing[props.pt] : undefined,
    paddingBottom: props.pb ? theme.spacing[props.pb] : undefined,
    margin: props.m ? theme.spacing[props.m] : undefined,
    marginHorizontal: props.mx ? theme.spacing[props.mx] : undefined,
    marginVertical: props.my ? theme.spacing[props.my] : undefined,
    marginTop: props.mt ? theme.spacing[props.mt] : undefined,
    marginBottom: props.mb ? theme.spacing[props.mb] : undefined,
  }),
}));
