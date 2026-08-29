import {
  type BottomSheetBackdropProps,
  useBottomSheetModal,
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
    <Pressable onPress={() => dismiss()} style={styles.wrapper}>
      <Animated.View style={containerStyle} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
});
