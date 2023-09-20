import { ScrollView } from 'react-native';

import { Box } from '$shared/ui/primitives';

import { SandBoxItem } from '../menu/components/SandboxItem';

const BoxSandbox = () => (
  <ScrollView>
    <SandBoxItem title="Box with a size, color and radiuses">
      <Box bg="grey" borderRadius="global_8" height={100} width={100} />
    </SandBoxItem>

    <SandBoxItem title="Box with border props and full width">
      <Box
        bg="grey"
        borderBottomColor="green"
        borderBottomWidth={4}
        height={50}
        width="100%"
      />
    </SandBoxItem>

    <SandBoxItem title="Box with position props and odd size">
      <Box bg="grey" height={50} left={50} mb="global_32" width={100} />
    </SandBoxItem>
  </ScrollView>
);

export default BoxSandbox;
