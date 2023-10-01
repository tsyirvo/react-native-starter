import { ScrollView } from 'react-native';

import { fontSizes } from '$core/theme';
import type { FontSizes } from '$core/theme';
import { Text } from '$shared/uiKit/primitives';

import { SandBoxItem } from '../menu/components/SandboxItem';

export function FontSizesSandbox() {
  return (
    <ScrollView>
      <SandBoxItem isSingle>
        {(Object.keys(fontSizes) as FontSizes[]).map((size) => (
          <Text key={size} mb="spacing_24" variant={size}>
            {`This is a ${size} text`}
          </Text>
        ))}
      </SandBoxItem>
    </ScrollView>
  );
}
