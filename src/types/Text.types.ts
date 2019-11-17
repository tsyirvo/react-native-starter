import {
  FontSizeProps,
  HeightProps,
  ColorProps,
  LineHeightProps,
  TextAlignProps,
  LetterSpacingProps,
  WidthProps,
  OpacityProps,
  MaxWidthProps,
  MarginProps,
} from 'styled-system';

export type TText = ColorProps &
  FontSizeProps &
  TextAlignProps &
  LineHeightProps &
  LetterSpacingProps &
  WidthProps &
  HeightProps &
  OpacityProps &
  MaxWidthProps &
  MarginProps;
