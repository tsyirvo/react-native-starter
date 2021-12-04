---
to: src/components/<%= h.changeCase.pascalCase(componentName) %>/components/__tests__/<%= h.changeCase.pascalCase(componentName) %>.test.tsx
---
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { fireEvent } from '@testing-library/react-native';

import render from '$tests/utils';

import <%= h.changeCase.pascalCase(componentName) %> from '../<%= h.changeCase.pascalCase(componentName) %>';

describe('<%= h.changeCase.pascalCase(componentName) %> page component', () => {
  // given

  it('should render correctly', () => {
    // When
    const wrapper = render(<<%= h.changeCase.pascalCase(componentName) %> />);

    // Then
    expect(wrapper).toMatchSnapshot();
  });
});
