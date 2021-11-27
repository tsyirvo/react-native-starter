import {
  SpaceProps,
  LayoutProps,
  ColorProps,
  FlexboxProps,
  BorderProps,
  BorderRadiusProps,
  PositionProps,
  TypographyProps,
} from 'styled-system';

export type ButtonProps = SpaceProps &
LayoutProps &
ColorProps &
BorderProps &
BorderRadiusProps &
PositionProps &
TypographyProps &
FlexboxProps;

export type VariantProps = {
  variant?: 'base' | 'baseDisabled';
};
