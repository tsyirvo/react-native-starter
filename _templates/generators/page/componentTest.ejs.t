---
to: src/pages/__tests__/<%= h.changeCase.pascalCase(componentName) %>.test.tsx
---
/* eslint-disable react/jsx-props-no-spreading */

import { render } from '$tests/utils';

import <%= h.changeCase.pascalCase(componentName) %> from '../<%= h.changeCase.pascalCase(componentName) %>';

describe('<%= h.changeCase.pascalCase(componentName) %> page', () => {
  // Setup
  const props = {
    navigation: navigationProps as unknown as <%= h.changeCase.pascalCase(componentName) %>ScreenNavigationProp,
  };

  it('should render correctly', () => {
    // Given
    const { getByText } = render(<<%= h.changeCase.pascalCase(componentName) %> {...props} />);

    // Then
    expect(getByText('<%= h.changeCase.pascalCase(componentName) %> page')).toBeDefined();
  });
});
