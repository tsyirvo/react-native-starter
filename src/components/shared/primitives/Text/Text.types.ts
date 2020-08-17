import {
  SpaceProps,
  LayoutProps,
  ColorProps,
  TypographyProps,
} from 'styled-system';

export type TextProps = SpaceProps & LayoutProps & ColorProps & TypographyProps;

export type VariantProps = {
  variant?: 'small' | 'medium' | 'regular' | 'large' | 'xLarge';
};
