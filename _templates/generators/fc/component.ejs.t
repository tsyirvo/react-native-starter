---
to: src/components/<%= h.changeCase.pascalCase(componentName) %>/components/<%= h.changeCase.pascalCase(componentName) %>.tsx
---
import { Flex, Title } from '$shared/primitives';

type Props = {
  someProps?: string;
};

const <%= h.changeCase.pascalCase(componentName) %> = ({ someProps }: Props) => (
  <Flex justifyContent="center" alignItems="center">
    <Title><%= h.changeCase.pascalCase(componentName) %> functional component</Title>
  </Flex>
);

export default <%= h.changeCase.pascalCase(componentName) %>;
