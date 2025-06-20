import {
  useBottomSheetModal,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { makeAppStyles, useAppTheme } from '$domain/theme';

export const AnimatedBottomSheetBackdrop = ({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) => {
  const { dismiss } = useBottomSheetModal();

  const { colors } = useAppTheme();
  const styles = useStyles();

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
        backgroundColor: colors.dark_80,
      },
      containerAnimatedStyle,
    ],
    [containerAnimatedStyle, style, styles.wrapper, colors],
  );

  return (
    <Pressable style={styles.wrapper} onPress={() => dismiss()}>
      <Animated.View style={containerStyle} />
    </Pressable>
  );
};

const useStyles = makeAppStyles(() => ({
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));
