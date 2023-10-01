import { ScrollView } from 'react-native';

import { theme } from '$core/theme';
import type { BorderRadii } from '$core/theme';
import { Box, Text } from '$shared/uiKit/primitives';

import { SandBoxItem } from '../menu/components/SandboxItem';

export function RadiusesSandbox() {
  return (
    <ScrollView>
      <SandBoxItem isSingle>
        {(Object.keys(theme.borderRadii) as BorderRadii[]).map((radius) => (
          <Box key={radius} alignItems="center" mb="spacing_24">
            <Text mb="spacing_8">{radius}</Text>

            <Box
              bg="secondary_100"
              borderRadius={radius}
              height={100}
              width={100}
            />
          </Box>
        ))}
      </SandBoxItem>
    </ScrollView>
  );
}
