import type { FlexAlignType } from 'react-native';

import type { ThemeSpacing } from '$domain/newTheme/unistyles';

/* ***** *****  Shared Spacing Props  ***** ***** */

export interface SpacingProps {
  gap?: ThemeSpacing;
  p?: ThemeSpacing;
  px?: ThemeSpacing;
  py?: ThemeSpacing;
  pt?: ThemeSpacing;
  pb?: ThemeSpacing;
  m?: ThemeSpacing;
  mx?: ThemeSpacing;
  my?: ThemeSpacing;
  mt?: ThemeSpacing;
  mb?: ThemeSpacing;
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
}

/* ***** *****  Combined Style Props  ***** ***** */

export interface LayoutStyleProps extends SpacingProps, AlignmentProps {}
