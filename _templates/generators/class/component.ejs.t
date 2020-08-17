---
to: src/components/<%= h.changeCase.pascalCase(componentName) %>/components/<%= h.changeCase.pascalCase(componentName) %>.tsx
---
import React, { Component, ReactElement } from 'react';

import Box from '@shared/Box';
import Text from '@shared/Text';

type Props = {
  someProps?: string;
};

const initialState = {
  someState: 'Some state',
};

type State = typeof initialState;

class <%= h.changeCase.pascalCase(componentName) %> extends Component<Props, State> {
  state = initialState;

  render(): ReactElement {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text><%= h.changeCase.pascalCase(componentName) %> class component</Text>
      </Box>
    );
  }
}

export default <%= h.changeCase.pascalCase(componentName) %>;
