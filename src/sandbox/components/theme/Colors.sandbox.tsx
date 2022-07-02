import { ScrollView } from 'react-native';

import { Box, Text } from '$components/ui/primitives';
import { Colors } from '$styles/colors';
import { theme } from '$styles/theme';

import SandBoxItem from '../menu/components/SandboxItem';

const ColorsSandbox = () => (
  <ScrollView>
    <SandBoxItem isSingle>
      {(Object.keys(theme.colors) as Colors[]).map((color) => (
        <Box key={color} alignItems="center" mb="global_24">
          <Text pb="global_8">{color}</Text>

          <Box aspectRatio={1} bg={color} borderRadius="global_8" width={100} />
        </Box>
      ))}
    </SandBoxItem>
  </ScrollView>
);

export default ColorsSandbox;
