/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { withKnobs, number } from '@storybook/addon-knobs';

import Box from '@shared/Box';
import Button from '@shared/Button';
import Text from '@shared/Text';

addDecorator(withBackgrounds);
addDecorator(withKnobs);

storiesOf('Button', module)
  .addParameters({
    backgrounds: [
      { name: 'white', value: '#fff', default: true },
      { name: 'black', value: '#000' },
    ],
  })
  .add('with text', () => (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Button onPress={action('Pressed')}>
        <Text>Default story</Text>
      </Button>
    </Box>
  ));

storiesOf('Text', module).add('colors', () => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <Text fontSize={number('Font size', 4)}>Some text</Text>
  </Box>
));
