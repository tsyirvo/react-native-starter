import styled from 'styled-components/native';

export const StyledText = styled.Text`
  font-size: ${props => props.theme.textSizes.regular};
  color: ${props => props.theme.colors.primary};
`;

export const StyledTextBold = styled.Text`
  font-size: ${props => props.theme.textSizes.big};
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
`;
