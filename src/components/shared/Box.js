import styled from 'styled-components';
import {
  space,
  width,
  fontSize,
  color,
  alignItems,
  alignSelf,
  justifyContent,
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
} from 'styled-system';

const Box = styled.View`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  ${alignItems}
  ${justifyContent}
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
