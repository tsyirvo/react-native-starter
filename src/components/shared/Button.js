import React from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import { onlyUpdateForKeys } from 'recompose';

import { StyledText } from 'styledComponents/texts';

const StyledButton = styled.TouchableOpacity`
  padding-horizontal: 15px;
  padding-vertical: 10px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.grey};
  margin-horizontal: 15px;
  margin-top: 10px;
`;

const enhancer = onlyUpdateForKeys(['label']);

const Button = ({ label, action }) => {
  return (
    <StyledButton onPress={action}>
      <StyledText>{label}</StyledText>
    </StyledButton>
  );
};

Button.propTypes = {
  label: string.isRequired,
  action: func.isRequired
};

export default enhancer(Button);
