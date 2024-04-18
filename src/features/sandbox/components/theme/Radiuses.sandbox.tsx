import type { BorderRadii } from '$core/theme';
import { theme } from '$core/theme';
import { Box, Text } from '$shared/uiKit/primitives';
import { Screen } from '$shared/uiKit/Screen';

import { SandBoxItem } from '../menu/components/SandboxItem';

export const RadiusesSandbox = () => {
  return (
    <Screen>
      <SandBoxItem isSingle>
        {(Object.keys(theme.borderRadii) as BorderRadii[]).map((radius) => (
          <Box key={radius} alignItems="center" mb="spacing_24">
            <Text mb="spacing_8">{radius}</Text>

            <Box bg="bg_focus" borderRadius={radius} height={100} width={100} />
          </Box>
        ))}
      </SandBoxItem>
    </Screen>
  );
};
