import { ScrollView } from 'react-native';

import { theme } from '$core/theme';
import type { Colors } from '$core/theme';
import { Box, Text } from '$shared/ui/primitives';

import { SandBoxItem } from '../menu/components/SandboxItem';

export const ColorsSandbox = () => (
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
