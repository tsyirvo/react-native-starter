import { ScrollView } from 'react-native';

import { Text } from '$shared/uiKit/primitives';

import { SandBoxItem } from '../menu/components/SandboxItem';

export const TextSandbox = () => {
  return (
    <ScrollView>
      <SandBoxItem title="Text without any props">
        <Text>Default styles</Text>
      </SandBoxItem>

      <SandBoxItem title="Text with a custom variant">
        <Text variant="medium">Large variant</Text>
      </SandBoxItem>

      <SandBoxItem title="Text with custom styles">
        <Text color="primary_100" textAlign="center">
          Custom styles
        </Text>
      </SandBoxItem>

      <SandBoxItem title="Text with custom positionning">
        <Text mt="spacing_32" pl="spacing_24" py="spacing_8">
          Custom position
        </Text>
      </SandBoxItem>
    </ScrollView>
  );
};
