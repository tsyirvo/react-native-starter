import styled from 'styled-components/native';
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

import { TText } from 'types/Text.types';

const StyledText = styled.Text<TText>`
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
