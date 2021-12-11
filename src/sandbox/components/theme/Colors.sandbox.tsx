import { ScrollView } from 'react-native';

import { Box, Text } from '$components/shared/primitives';
import { Colors } from '$styles/colors';
import { theme } from '$styles/theme';

import SandBoxItem from '../menu/components/SandboxItem';

const ColorsSandbox = () => (
  <ScrollView>
    <SandBoxItem isSingle>
      {(Object.keys(theme.colors) as Colors[]).map((color) => (
        <Box alignItems="center" key={color} mb="global_24">
          <Text>{color}</Text>
          <Box width={100} aspectRatio={1} bg={color} />
        </Box>
      ))}
    </SandBoxItem>
  </ScrollView>
);

export default ColorsSandbox;
