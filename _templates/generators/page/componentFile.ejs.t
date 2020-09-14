---
to: src/components/<%= h.changeCase.pascalCase(componentName) %>/components/<%= h.changeCase.pascalCase(componentName) %>.tsx
---
import React, { Component, ReactElement } from 'react';

import { Flex, Title } from '$shared/primitives';
import SafeView from '$shared/SafeView';

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
      <SafeView>
        <Flex justifyContent="center" alignItems="center">
          <Title><%= h.changeCase.pascalCase(componentName) %> page</Title>
        </Flex>
      </SafeView>
    );
  }
}

export default <%= h.changeCase.pascalCase(componentName) %>;
