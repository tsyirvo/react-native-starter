import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { LayoutStyleProps } from './primitiveLayout.types';

/* ***** *****  Types  ***** ***** */

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

interface BoxStyleProps extends LayoutStyleProps {
  flex?: number;
  direction?: FlexDirection;
  wrap?: FlexWrap;
}

export interface BoxProps
  extends Omit<
      ViewProps,
      keyof Omit<BoxStyleProps, 'flex' | 'direction' | 'wrap'>
    >,
    LayoutStyleProps {
  flex?: number;
  direction?: FlexDirection;
  wrap?: FlexWrap;
}

/* ***** *****  Component  ***** ***** */

export const Box = ({
  style,
  children,
  testID,
  onLayout,
  ...stylingProps
}: BoxProps) => (
  <View
    style={[styles.box(stylingProps), style]}
    testID={testID}
    onLayout={onLayout}
  >
    {children}
  </View>
);

/* ***** *****  Styles  ***** ***** */

const styles = StyleSheet.create((theme) => ({
  box: (props: BoxStyleProps) => ({
    flex: props.flex ?? 1,
    flexDirection: props.direction,
    flexWrap: props.wrap,
    alignItems: props.align,
    justifyContent: props.justify,
    alignSelf: props.self,
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
