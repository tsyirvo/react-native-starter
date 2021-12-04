import React from 'react';
import { ScrollView } from 'react-native';

import { Input, Text } from '$components/shared/primitives';

import CenteredContent from '../menu/components/CenteredContent';

const InputSandbox = () => (
  <ScrollView>
    <CenteredContent>
      <Text pb="small">Input with a label</Text>

      <Input label="Some label" placeholder="Type here" />
    </CenteredContent>

    <CenteredContent>
      <Text pb="small">Input with an error</Text>

      <Input label="Some label" placeholder="Type here" error="An error" />
    </CenteredContent>

    <CenteredContent>
      <Text pb="small">Input without label</Text>

      <Input value="Some value" />
    </CenteredContent>

    <CenteredContent>
      <Text pb="small">Input not editable</Text>

      <Input label="Some label" placeholder="Type here" editable={false} />
    </CenteredContent>
  </ScrollView>
);

export default InputSandbox;
