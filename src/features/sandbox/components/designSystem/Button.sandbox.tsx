import { Alert, ScrollView } from 'react-native';

import { Button } from '$shared/uiKit/button';

import { SandBoxItem } from '../menu/components/SandboxItem';

export function ButtonSandbox() {
  return (
    <ScrollView>
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
    </ScrollView>
  );
}
