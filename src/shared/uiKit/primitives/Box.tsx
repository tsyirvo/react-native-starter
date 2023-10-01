/* eslint-disable react/jsx-props-no-spreading */

import { createBox } from '@shopify/restyle';
import type React from 'react';
import Animated from 'react-native-reanimated';

import type { Theme } from '$core/theme';

export type BoxProps = React.ComponentPropsWithRef<typeof Box>;

export const Box = createBox<Theme>();

export const AnimatedBox = Animated.createAnimatedComponent(Box);
