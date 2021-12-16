import { ScrollView } from 'react-native';

import { Box, Text } from '$components/shared/primitives';
import { BorderRadii } from '$styles/radius';
import { theme } from '$styles/theme';

import SandBoxItem from '../menu/components/SandboxItem';

const RadiusesSandbox = () => (
  <ScrollView>
    <SandBoxItem isSingle>
      {(Object.keys(theme.borderRadii) as BorderRadii[]).map((radius) => (
        <Box alignItems="center" key={radius} mb="global_24">
          <Text mb="global_8">{radius}</Text>

          <Box width={100} height={100} bg="grey" borderRadius={radius} />
        </Box>
      ))}
    </SandBoxItem>
  </ScrollView>
);

export default RadiusesSandbox;
