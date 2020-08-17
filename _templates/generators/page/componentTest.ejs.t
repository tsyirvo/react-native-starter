---
to: src/components/<%= h.changeCase.pascalCase(componentName) %>/components/__tests__/<%= h.changeCase.pascalCase(componentName) %>.spec.tsx
---
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
// import { fireEvent } from '@testing-library/react-native';
import { shallow } from 'enzyme';

// import render from '@tests/utils';

import <%= h.changeCase.pascalCase(componentName) %> from '../<%= h.changeCase.pascalCase(componentName) %>';

describe('<%= h.changeCase.pascalCase(componentName) %> page component', () => {
  // given

  it('should render correctly', () => {
    // When
    const wrapper = shallow(<<%= h.changeCase.pascalCase(componentName) %> />);

    // Then
    expect(wrapper).toMatchSnapshot();
  });
});
