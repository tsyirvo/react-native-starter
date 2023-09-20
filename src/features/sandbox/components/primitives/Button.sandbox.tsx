import { Alert, ScrollView } from 'react-native';

import { Button } from '$shared/ui/primitives';

import { SandBoxItem } from '../menu/components/SandboxItem';

export const ButtonSandbox = () => (
  <ScrollView>
    <SandBoxItem title="Button with a text content">
      <Button
        label="Click here"
        variant="base"
        onPress={() => Alert.alert('Text pressed')}
      />
    </SandBoxItem>
  </ScrollView>
);
