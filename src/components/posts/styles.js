import styled from 'styled-components';

import { SContainerRow } from 'sc/containers';

// StyledSeparator
export const StyledSeparator = styled.View`
  height: 1;
  background-color: ${props => props.theme.colors.primary};
  margin-vertical: 15px;
`;

// Post
export const SWrapperPost = styled.View`
  padding-horizontal: 10px;
`;
export const SWrapperText = styled.View`
  margin-bottom: 5px;
`;
export const SWrapperButtons = SContainerRow.extend`
  justify-content: space-around;
`;

// Controls
export const SWrapperControls = SContainerRow.extend`
  justify-content: space-around;
  margin-vertical: 15px;
`;
