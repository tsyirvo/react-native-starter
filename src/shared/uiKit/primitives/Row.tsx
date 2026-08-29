import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { LayoutStyleProps } from './primitiveLayout.types';

/* ***** *****  Types  ***** ***** */

interface RowProps
  extends Omit<ViewProps, keyof LayoutStyleProps>,
    LayoutStyleProps {}

/* ***** *****  Component  ***** ***** */

export const Row = ({
  style,
  children,
  testID,
  onLayout,
  ...layoutProps
}: RowProps) => (
  <View
    onLayout={onLayout}
    style={[styles.row(layoutProps), style]}
    testID={testID}
  >
    {children}
  </View>
);

/* ***** *****  Styles  ***** ***** */

const styles = StyleSheet.create((theme) => ({
  row: (props: LayoutStyleProps) => ({
    alignItems: props.align,
    alignSelf: props.self,
    flexDirection: 'row',
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
