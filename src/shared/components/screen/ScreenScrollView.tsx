import type { ComponentProps } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { IS_ANDROID } from '$infra/config';

type ScreenScrollViewProps = Omit<
  ComponentProps<typeof ScrollView>,
  'contentInsetAdjustmentBehavior'
>;

export const ScreenScrollView = ({ contentContainerStyle, ...props }: ScreenScrollViewProps) => (
  <ScrollView
    contentContainerStyle={[styles.content, contentContainerStyle]}
    contentInsetAdjustmentBehavior="automatic"
    {...props}
  />
);

const styles = StyleSheet.create((_theme, rt) => ({
  content: {
    paddingTop: IS_ANDROID ? rt.insets.top : 0,
  },
}));
