import { ScrollView } from 'react-native';

import { theme } from '$core/theme';
import type { BorderRadii } from '$core/theme';
import { Box, Text } from '$shared/ui/primitives';

import { SandBoxItem } from '../menu/components/SandboxItem';

export const RadiusesSandbox = () => (
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
