---
to: src/pages/<%= h.changeCase.pascalCase(componentName) %>.tsx
---
import { Box, Text } from '$components/ui/primitives';
import SafeView from '$components/ui/SafeView';
import { <%= h.changeCase.pascalCase(componentName) %>ScreenNavigationProp } from '$navigation/navigation.types';

type <%= h.changeCase.pascalCase(componentName) %>Props = {
  navigation: <%= h.changeCase.pascalCase(componentName) %>ScreenNavigationProp;
};

const <%= h.changeCase.pascalCase(componentName) %> = ({ navigation }: <%= h.changeCase.pascalCase(componentName) %>Props) => (
  <SafeView edges={['bottom']}>
    <Box flex={1}>
      <Text variant="large"><%= h.changeCase.pascalCase(componentName) %> page</Text>
    </Box>
  </SafeView>
);

export default <%= h.changeCase.pascalCase(componentName) %>;
