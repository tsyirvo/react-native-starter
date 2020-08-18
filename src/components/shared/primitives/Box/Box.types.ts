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

export type BoxProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  BackgroundProps &
  BorderProps &
  BorderRadiusProps &
  PositionProps &
  TypographyProps;
