import { ScrollView } from 'react-native';

import { Button } from '$components/ui/primitives';

import SandBoxItem from '../menu/components/SandboxItem';

const ButtonSandbox = () => (
  <ScrollView>
    <SandBoxItem title="Button with a text content">
      <Button
        variant="base"
        onPress={() => console.log('Text pressed')}
        label="Click here"
      />
    </SandBoxItem>
  </ScrollView>
);

export default ButtonSandbox;
