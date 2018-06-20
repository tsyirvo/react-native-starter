import styled from 'styled-components';

export const SText = styled.Text`
  font-size: ${props => props.theme.textSizes.regular};
  color: ${props => props.theme.colors.primary};
`;

export const STextBold = styled.Text`
  font-size: ${props => props.theme.textSizes.big};
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
`;
