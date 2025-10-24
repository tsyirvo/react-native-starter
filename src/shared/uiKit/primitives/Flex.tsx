import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { LayoutStyleProps } from './primitiveLayout.types';

/* ***** *****  Types  ***** ***** */

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

interface FlexStyleProps extends LayoutStyleProps {
  direction: FlexDirection;
  wrap?: FlexWrap;
}

interface FlexProps
  extends Omit<ViewProps, keyof Omit<FlexStyleProps, 'direction'>>,
    LayoutStyleProps {
  direction?: FlexDirection;
  wrap?: FlexWrap;
}

/* ***** *****  Component  ***** ***** */

export const Flex = ({
  direction = 'column',
  wrap,
  style,
  children,
  testID,
  onLayout,
  ...layoutProps
}: FlexProps) => (
  <View
    style={[
      styles.flex({
        direction,
        wrap,
        ...layoutProps,
      }),
      style,
    ]}
    testID={testID}
    onLayout={onLayout}
  >
    {children}
  </View>
);

/* ***** *****  Styles  ***** ***** */

const styles = StyleSheet.create((theme) => ({
  flex: (props: FlexStyleProps) => ({
    flexDirection: props.direction,
    alignItems: props.align,
    justifyContent: props.justify,
    flexWrap: props.wrap,
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
