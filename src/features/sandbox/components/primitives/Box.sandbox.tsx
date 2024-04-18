import { Box } from '$shared/uiKit/primitives';
import { Screen } from '$shared/uiKit/Screen';

import { SandBoxItem } from '../menu/components/SandboxItem';

export const BoxSandbox = () => {
  return (
    <Screen>
      <SandBoxItem title="Box with a size, color and radiuses">
        <Box bg="bg_focus" borderRadius="radius_8" height={100} width={100} />
      </SandBoxItem>

      <SandBoxItem title="Box with border props and full width">
        <Box
          bg="bg_focus"
          borderBottomColor="positive"
          borderBottomWidth={4}
          height={50}
          width="100%"
        />
      </SandBoxItem>

      <SandBoxItem title="Box with position props and odd size">
        <Box bg="bg_focus" height={50} left={50} mb="spacing_32" width={100} />
      </SandBoxItem>
    </Screen>
  );
};
