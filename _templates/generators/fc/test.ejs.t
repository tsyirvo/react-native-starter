---
to: src/components/<%= h.changeCase.pascalCase(componentName) %>/components/__tests__/<%= h.changeCase.pascalCase(componentName) %>.spec.tsx
---
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
// import { fireEvent } from '@testing-library/react-native';

import render from '@tests/utils';

import <%= h.changeCase.pascalCase(componentName) %> from '../<%= h.changeCase.pascalCase(componentName) %>';

describe('<%= h.changeCase.pascalCase(componentName) %> component', () => {
  // given
  const props = { someProps: 'Some value' };

  it('should render correctly', () => {
    // When
    const wrapper = render(<<%= h.changeCase.pascalCase(componentName) %> {...props} />);

    // Then
    expect(wrapper).toMatchSnapshot();
  });
});
