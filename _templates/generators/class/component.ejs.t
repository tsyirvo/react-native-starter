---
to: src/components/<%= h.changeCase.pascalCase(componentName) %>/components/<%= h.changeCase.pascalCase(componentName) %>.tsx
---
import { Component } from 'react';

import { Flex, Title } from '$shared/primitives';

type Props = {
  someProps?: string;
};

const initialState = {
  someState: 'Some state',
};

type State = typeof initialState;

class <%= h.changeCase.pascalCase(componentName) %> extends Component<Props, State> {
  state = initialState;

  render() {
    return (
      <Flex justifyContent="center" alignItems="center">
        <Title><%= h.changeCase.pascalCase(componentName) %> class component</Title>
      </Flex>
    );
  }
}

export default <%= h.changeCase.pascalCase(componentName) %>;
