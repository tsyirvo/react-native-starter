import type { Colors } from '$core/theme';
import { theme } from '$core/theme';
import { Box, Text } from '$shared/uiKit/primitives';
import { Screen } from '$shared/uiKit/Screen';

import { SandBoxItem } from '../menu/components/SandboxItem';

export const ColorsSandbox = () => {
  return (
    <Screen>
      <SandBoxItem isSingle>
        {(Object.keys(theme.colors) as Colors[]).map((color) => (
          <Box key={color} alignItems="center" mb="spacing_24">
            <Text pb="spacing_8">{color}</Text>

            <Box
              aspectRatio={1}
              bg={color}
              borderRadius="radius_8"
              width={100}
            />
          </Box>
        ))}
      </SandBoxItem>
    </Screen>
  );
};
