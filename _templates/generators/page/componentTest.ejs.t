---
to: src/pages/__tests__/<%= h.changeCase.pascalCase(componentName) %>.test.tsx
---
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { render } from '$tests/utils';

import <%= h.changeCase.pascalCase(componentName) %> from '../<%= h.changeCase.pascalCase(componentName) %>';

describe('<%= h.changeCase.pascalCase(componentName) %> page', () => {
  // Given
  const props = { navigation: { navigate: jest.fn() } as any };

  it('should render correctly', () => {
    // Given
    const { getByText } = render(<<%= h.changeCase.pascalCase(componentName) %> {...props} />);

    // Then
    expect(getByText('<%= h.changeCase.pascalCase(componentName) %> page')).toBeDefined();
  });
});
