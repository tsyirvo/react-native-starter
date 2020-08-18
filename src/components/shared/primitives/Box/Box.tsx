import styled from 'styled-components/native';
import {
  space,
  layout,
  color,
  flexbox,
  background,
  border,
  borderRadius,
  position,
  shadow,
  typography,
} from 'styled-system';

import { BoxProps } from './Box.types';

export const Box = styled.View<BoxProps>`
  ${space}
  ${layout}
  ${background}
  ${color}
  ${border}
  ${borderRadius}
  ${position}
  ${typography}
  ${shadow}
  ${flexbox}
`;

export const Flex = styled(Box)`
  flex: 1;
`;

export const GreyBox = styled(Box)`
  background-color: ${(p) => p.theme.colors.grey};
`;
