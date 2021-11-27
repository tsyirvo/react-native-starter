/* eslint-disable import/no-extraneous-dependencies */

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import React from 'react';

import CenteredContent from '$components/shared/CenteredContent';
import { Text } from '$components/shared/primitives';

import Button from '../Button';

storiesOf('Button', module).add('With a text content', () => (
  <CenteredContent>
    <Button onPress={action('Text pressed')}>
      <Text>Click here</Text>
    </Button>
  </CenteredContent>
));
