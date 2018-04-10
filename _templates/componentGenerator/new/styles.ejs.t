---
to: src/components/<%= folderName %>/styles.js
---
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { StyledContainerBasic } from 'styledComponents/containers';
import { StyledTextSmall } from 'styledComponents/texts';

const { width, height } = Dimensions.get('window');

// <%= componentName %>
export const SWrapper = StyledContainerBasic.extend`
  background-color: transparent;
`;