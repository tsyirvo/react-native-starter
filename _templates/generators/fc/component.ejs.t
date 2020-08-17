---
to: src/components/<%= h.changeCase.pascalCase(componentName) %>/components/<%= h.changeCase.pascalCase(componentName) %>.tsx
---
import React, { ReactElement } from 'react';

import Box from '@shared/Box';
import Text from '@shared/Text';

type Props = {
  someProps?: string;
};

const <%= h.changeCase.pascalCase(componentName) %> = ({ someProps }: Props): ReactElement => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <Text><%= h.changeCase.pascalCase(componentName) %> functional component</Text>
  </Box>
);

<%= h.changeCase.pascalCase(componentName) %>.defaultProps = {
  someProps: 'Some value',
};

export default <%= h.changeCase.pascalCase(componentName) %>;
