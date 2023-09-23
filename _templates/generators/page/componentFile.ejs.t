---
to: src/screens/<%= h.changeCase.pascalCase(componentName) %>.tsx
---
import { Box, Text } from '$shared/ui/primitives';
import { Screen } from '$shared/ui/Screen';

type <%= h.changeCase.pascalCase(componentName) %>Props = {
  someProp?: string;
};

export const <%= h.changeCase.pascalCase(componentName) %> = ({ someProp }: <%= h.changeCase.pascalCase(componentName) %>Props) => (
  <Screen>
    <Box flex={1}>
      <Text variant="large"><%= h.changeCase.pascalCase(componentName) %> screen</Text>
    </Box>
  </Screen>
);

