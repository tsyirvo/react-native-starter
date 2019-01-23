/* eslint-disable */

import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Box from 'shared/Box';
import Button from 'shared/Button';
import Text from 'shared/Text';

storiesOf('Button', module).add('with text', () => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <Button onPress={() => console.log('Pressed')}>
      <Text>Default story</Text>
    </Button>
  </Box>
));
