import {
  useBottomSheetModal,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Pressable } from '$shared/components';

export const AnimatedBottomSheetBackdrop = ({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) => {
  const { dismiss } = useBottomSheetModal();

  const { theme } = useUnistyles();

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.75],
      Extrapolation.CLAMP,
    ),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      styles.wrapper,
      {
        backgroundColor: theme.colors.dark_80,
      },
      containerAnimatedStyle,
    ],
    [containerAnimatedStyle, style, theme.colors.dark_80],
  );

  return (
    <Pressable style={styles.wrapper} onPress={() => dismiss()}>
      <Animated.View style={containerStyle} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
