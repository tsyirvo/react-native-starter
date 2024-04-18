import { Alert } from 'react-native';

import { Button } from '$shared/uiKit/button';
import { Screen } from '$shared/uiKit/Screen';

import { SandBoxItem } from '../menu/components/SandboxItem';

export const ButtonSandbox = () => {
  return (
    <Screen>
      <SandBoxItem title="Button with a text content">
        <Button.Text
          variant="base"
          onPress={() => {
            Alert.alert('Text pressed');
          }}
        >
          Click here
        </Button.Text>
      </SandBoxItem>
    </Screen>
  );
};
