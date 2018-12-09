import styled from 'styled-components';
import {
  space,
  color,
  width,
  fontSize,
  textAlign,
  lineHeight,
  letterSpacing,
  height,
  opacity,
  maxWidth,
} from 'styled-system';

const StyledText = styled.Text`
  ${space}
  ${color}
  ${fontSize}
  ${textAlign}
  ${lineHeight}
  ${letterSpacing}
  ${width}
  ${height}
  ${opacity}
  ${maxWidth}
`;

StyledText.displayName = 'Text';

export default StyledText;
