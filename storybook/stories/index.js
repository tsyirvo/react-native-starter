/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { withKnobs, number } from '@storybook/addon-knobs';

import { Flex, Text } from '@shared/primitives';
import Button from '@shared/Button';

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
    <Flex justifyContent="center" alignItems="center">
      <Button onPress={action('Pressed')}>
        <Text>Default story</Text>
      </Button>
    </Flex>
  ));

storiesOf('Text', module).add('colors', () => (
  <Flex justifyContent="center" alignItems="center">
    <Text fontSize={number('Font size', 4)}>Some text</Text>
  </Flex>
));
