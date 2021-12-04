import React from 'react';
import { ScrollView } from 'react-native';

import { Text } from '$components/shared/primitives';

import CenteredContent from '../menu/components/CenteredContent';

const TextSandbox = () => (
  <ScrollView>
    <CenteredContent>
      <Text pb="small">Text without any props</Text>

      <Text>Default styles</Text>
    </CenteredContent>

    <CenteredContent>
      <Text pb="small">Text with a custom variant</Text>

      <Text variant="medium">Large variant</Text>
    </CenteredContent>

    <CenteredContent>
      <Text pb="small">Text with custom styles</Text>

      <Text color="blue" fontWeight={600} lineHeight="50px" textAlign="center">
        Custom styles
      </Text>
    </CenteredContent>

    <CenteredContent>
      <Text pb="small">Text with custom positionning</Text>

      <Text mt={100} pl={20} py={10}>
        Custom position
      </Text>
    </CenteredContent>
  </ScrollView>
);

export default TextSandbox;
