---
to: src/components/<%= folderName %>/components/<%= componentName %>.js
---
import React, { PureComponent } from 'react';

import { StyledContainerBasic } from 'styles/styledComponents/containers';
import { StyledTextSmall } from 'styles/styledComponents/texts';

class <%= componentName %> extends PureComponent {
  state = {};

  render() {
    return (
      <StyledContainerBasic>
        <StyledTextSmall>Functional Class</StyledTextSmall>
      </StyledContainerBasic>
    );
  }
}

export default <%= componentName %>;