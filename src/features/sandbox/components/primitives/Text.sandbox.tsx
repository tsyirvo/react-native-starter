import { ScrollView } from 'react-native';

import { Text } from '$shared/ui/primitives';

import { SandBoxItem } from '../menu/components/SandboxItem';

export const TextSandbox = () => (
  <ScrollView>
    <SandBoxItem title="Text without any props">
      <Text>Default styles</Text>
    </SandBoxItem>

    <SandBoxItem title="Text with a custom variant">
      <Text variant="medium">Large variant</Text>
    </SandBoxItem>

    <SandBoxItem title="Text with custom styles">
      <Text color="blue" textAlign="center">
        Custom styles
      </Text>
    </SandBoxItem>

    <SandBoxItem title="Text with custom positionning">
      <Text mt="global_32" pl="global_24" py="global_8">
        Custom position
      </Text>
    </SandBoxItem>
  </ScrollView>
);
