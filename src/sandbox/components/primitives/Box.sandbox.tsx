import { ScrollView } from 'react-native';

import { Box } from '$components/shared/primitives';

import SandBoxItem from '../menu/components/SandboxItem';

const BoxSandbox = () => (
  <ScrollView>
    <SandBoxItem title="Box with a size, color and radiuses">
      <Box size={100} bg="grey" borderRadius="medium" />
    </SandBoxItem>

    <SandBoxItem title="Box with border props and full width">
      <Box
        width="100%"
        height={50}
        bg="grey"
        borderBottomColor="green"
        borderBottomWidth={4}
      />
    </SandBoxItem>

    <SandBoxItem title="Box with position props and odd size">
      <Box width={100} height={50} bg="grey" left={50} mb={50} />
    </SandBoxItem>
  </ScrollView>
);

export default BoxSandbox;