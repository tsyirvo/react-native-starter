import styled from 'styled-components/native';
import {
  space,
  width,
  fontSize,
  color,
  alignItems,
  alignSelf,
  justifyContent,
  flex,
  flexWrap,
  flexDirection,
  position,
  height,
  borderRadius,
  borders,
  maxWidth,
  maxHeight,
  minHeight,
  zIndex,
  layout,
  flexbox,
} from 'styled-system';

import { TBox } from 'types/Box.types';

const Box = styled.View<TBox>`
  ${layout}
  ${flexbox}
  ${space}
  ${width}
  ${fontSize}
  ${color}
  ${alignItems}
  ${justifyContent}
  ${flex}
  ${flexWrap}
  ${flexDirection}
  ${position}
  ${height}
  ${alignSelf}
  ${borderRadius}
  ${borders}
  ${maxWidth}
  ${maxHeight}
  ${minHeight}
  ${zIndex}
`;

export default Box;
