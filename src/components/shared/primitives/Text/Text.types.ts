import { TextProps as BaseTextProps } from 'react-native';
import {
  SpaceProps,
  LayoutProps,
  ColorProps,
  TypographyProps,
} from 'styled-system';

export type TextProps = BaseTextProps &
  SpaceProps &
  LayoutProps &
  ColorProps &
  TypographyProps;

export type VariantProps = {
  variant?: 'small' | 'medium' | 'regular' | 'large' | 'xLarge';
};
