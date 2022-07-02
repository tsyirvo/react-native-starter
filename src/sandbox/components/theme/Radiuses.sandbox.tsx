import { ScrollView } from 'react-native';

import { Box, Text } from '$components/ui/primitives';
import { BorderRadii } from '$styles/radius';
import { theme } from '$styles/theme';

import SandBoxItem from '../menu/components/SandboxItem';

const RadiusesSandbox = () => (
  <ScrollView>
    <SandBoxItem isSingle>
      {(Object.keys(theme.borderRadii) as BorderRadii[]).map((radius) => (
        <Box key={radius} alignItems="center" mb="global_24">
          <Text mb="global_8">{radius}</Text>

          <Box bg="grey" borderRadius={radius} height={100} width={100} />
        </Box>
      ))}
    </SandBoxItem>
  </ScrollView>
);

export default RadiusesSandbox;
