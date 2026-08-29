import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { LayoutStyleProps } from './primitiveLayout.types';

/* ***** *****  Types  ***** ***** */

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

interface BoxStyleProps extends LayoutStyleProps {
  direction?: FlexDirection;
  flex?: number;
  wrap?: FlexWrap;
}

export interface BoxProps
  extends Omit<
      ViewProps,
      keyof Omit<BoxStyleProps, 'flex' | 'direction' | 'wrap'>
    >,
    LayoutStyleProps {
  direction?: FlexDirection;
  flex?: number;
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
    onLayout={onLayout}
    style={[styles.box(stylingProps), style]}
    testID={testID}
  >
    {children}
  </View>
);

/* ***** *****  Styles  ***** ***** */

const styles = StyleSheet.create((theme) => ({
  box: (props: BoxStyleProps) => ({
    alignItems: props.align,
    alignSelf: props.self,
    flex: props.flex ?? 1,
    flexDirection: props.direction,
    flexWrap: props.wrap,
    gap: props.gap ? theme.spacing[props.gap] : undefined,
    justifyContent: props.justify,
    margin: props.m ? theme.spacing[props.m] : undefined,
    marginBottom: props.mb ? theme.spacing[props.mb] : undefined,
    marginHorizontal: props.mx ? theme.spacing[props.mx] : undefined,
    marginTop: props.mt ? theme.spacing[props.mt] : undefined,
    marginVertical: props.my ? theme.spacing[props.my] : undefined,
    padding: props.p ? theme.spacing[props.p] : undefined,
    paddingBottom: props.pb ? theme.spacing[props.pb] : undefined,
    paddingHorizontal: props.px ? theme.spacing[props.px] : undefined,
    paddingTop: props.pt ? theme.spacing[props.pt] : undefined,
    paddingVertical: props.py ? theme.spacing[props.py] : undefined,
  }),
}));
