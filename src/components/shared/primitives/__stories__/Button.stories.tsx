/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import CenteredContent from '$shared/CenteredContent';
import { Text } from '$shared/primitives';

import Button from '../Button';

storiesOf('Button', module).add('With a text content', () => (
  <CenteredContent>
    <Button onPress={action('Text pressed')}>
      <Text>Click here</Text>
    </Button>
  </CenteredContent>
));
