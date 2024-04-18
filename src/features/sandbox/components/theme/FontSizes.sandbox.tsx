import type { FontSizes } from '$core/theme';
import { fontSizes } from '$core/theme';
import { Text } from '$shared/uiKit/primitives';
import { Screen } from '$shared/uiKit/Screen';

import { SandBoxItem } from '../menu/components/SandboxItem';

export const FontSizesSandbox = () => {
  return (
    <Screen>
      <SandBoxItem isSingle>
        {(Object.keys(fontSizes) as FontSizes[]).map((size) => (
          <Text key={size} mb="spacing_24" variant={size}>
            {`This is a ${size} text`}
          </Text>
        ))}
      </SandBoxItem>
    </Screen>
  );
};
