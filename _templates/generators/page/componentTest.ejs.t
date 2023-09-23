---
to: src/screens/__tests__/<%= h.changeCase.pascalCase(componentName) %>.test.tsx
---
import { render } from '$core/testing';

import { <%= h.changeCase.pascalCase(componentName) %> } from '../<%= h.changeCase.pascalCase(componentName) %>';

describe('<%= h.changeCase.pascalCase(componentName) %> screen', () => {
  it('should render correctly', () => {
    // Given
    const { getByText } = render(<<%= h.changeCase.pascalCase(componentName) %> />);

    // Then
    expect(getByText('<%= h.changeCase.pascalCase(componentName) %> screen')).toBeDefined();
  });
});
