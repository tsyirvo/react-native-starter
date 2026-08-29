import type { FlexAlignType } from 'react-native';

import type { ThemeSpacing } from '$domain/theme';

/* ***** *****  Shared Spacing Props  ***** ***** */

export interface SpacingProps {
  gap?: ThemeSpacing;
  m?: ThemeSpacing;
  mb?: ThemeSpacing;
  mt?: ThemeSpacing;
  mx?: ThemeSpacing;
  my?: ThemeSpacing;
  p?: ThemeSpacing;
  pb?: ThemeSpacing;
  pt?: ThemeSpacing;
  px?: ThemeSpacing;
  py?: ThemeSpacing;
}

/* ***** *****  Shared Layout Props  ***** ***** */

export interface AlignmentProps {
  align?: FlexAlignType;
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  self?: FlexAlignType;
}

/* ***** *****  Combined Style Props  ***** ***** */

export interface LayoutStyleProps extends SpacingProps, AlignmentProps {}
