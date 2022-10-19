import { Alert, ScrollView } from 'react-native';

import { Button } from '$components/ui/primitives';

import SandBoxItem from '../menu/components/SandboxItem';

const ButtonSandbox = () => (
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

export default ButtonSandbox;
