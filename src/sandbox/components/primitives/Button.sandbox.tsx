import React from 'react';
import { ScrollView } from 'react-native';

import { Button, Text } from '$components/shared/primitives';

import CenteredContent from '../menu/components/CenteredContent';

const ButtonSandbox = () => (
  <ScrollView>
    <CenteredContent>
      <Text pb="small">Button with a text content</Text>

      <Button onPress={() => console.log('Text pressed')}>
        <Text>Click here</Text>
      </Button>
    </CenteredContent>
  </ScrollView>
);

export default ButtonSandbox;
