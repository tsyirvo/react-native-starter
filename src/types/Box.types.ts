import {
  FontSizeProps,
  HeightProps,
  ColorProps,
  WidthProps,
  MaxWidthProps,
  SpaceProps,
  AlignItemsProps,
  JustifyContentProps,
  FlexWrapProps,
  FlexDirectionProps,
  PositionProps,
  AlignSelfProps,
  BorderRadiusProps,
  BordersProps,
  MaxHeightProps,
  MinHeightProps,
  ZIndexProps,
  FlexProps,
} from 'styled-system';

export type TBox = SpaceProps &
  WidthProps &
  FontSizeProps &
  ColorProps &
  AlignItemsProps &
  JustifyContentProps &
  FlexWrapProps &
  FlexDirectionProps &
  PositionProps &
  HeightProps &
  AlignSelfProps &
  BorderRadiusProps &
  BordersProps &
  MaxWidthProps &
  MaxHeightProps &
  MinHeightProps &
  ZIndexProps &
  FlexProps;
