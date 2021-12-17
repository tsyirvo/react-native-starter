import { ScrollView } from 'react-native';

import { Text } from '$components/ui/primitives';
import { FontSizes, fontSizes } from '$styles/fonts';

import SandBoxItem from '../menu/components/SandboxItem';

const FontSizesSandbox = () => (
  <ScrollView>
    <SandBoxItem isSingle>
      {(Object.keys(fontSizes) as FontSizes[]).map((size) => (
        <Text key={size} variant={size} mb="global_24">
          {`This is a ${size} text`}
        </Text>
      ))}
    </SandBoxItem>
  </ScrollView>
);

export default FontSizesSandbox;
