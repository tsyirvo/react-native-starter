import { ViewProps } from 'react-native';
import {
  SpaceProps,
  LayoutProps,
  ColorProps,
  FlexboxProps,
  BackgroundProps,
  BorderProps,
  BorderRadiusProps,
  PositionProps,
  TypographyProps,
} from 'styled-system';

export type BoxProps = ViewProps &
  SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  BackgroundProps &
  BorderProps &
  BorderRadiusProps &
  PositionProps &
  TypographyProps;
