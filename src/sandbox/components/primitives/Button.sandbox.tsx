import { ScrollView } from 'react-native';

// import { Button, Text } from '$components/shared/primitives';

import SandBoxItem from '../menu/components/SandboxItem';

const ButtonSandbox = () => (
  <ScrollView>
    <SandBoxItem title="Button with a text content">
      {/* <Button onPress={() => console.log('Text pressed')}>
        <Text>Click here</Text>
      </Button> */}
    </SandBoxItem>
  </ScrollView>
);

export default ButtonSandbox;
