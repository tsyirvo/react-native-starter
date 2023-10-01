import { ScrollView } from 'react-native';

import { Box } from '$shared/uiKit/primitives';

import { SandBoxItem } from '../menu/components/SandboxItem';

export function BoxSandbox() {
  return (
    <ScrollView>
      <SandBoxItem title="Box with a size, color and radiuses">
        <Box
          bg="primary_100"
          borderRadius="radius_8"
          height={100}
          width={100}
        />
      </SandBoxItem>

      <SandBoxItem title="Box with border props and full width">
        <Box
          bg="primary_100"
          borderBottomColor="green"
          borderBottomWidth={4}
          height={50}
          width="100%"
        />
      </SandBoxItem>

      <SandBoxItem title="Box with position props and odd size">
        <Box
          bg="primary_100"
          height={50}
          left={50}
          mb="spacing_32"
          width={100}
        />
      </SandBoxItem>
    </ScrollView>
  );
}
