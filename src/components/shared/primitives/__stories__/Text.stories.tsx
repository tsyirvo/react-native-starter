/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react-native';

import CenteredContent from '@shared/CenteredContent';
import { Text } from '@shared/primitives';

storiesOf('Text', module)
  .add('Without any props', () => (
    <CenteredContent>
      <Text>Default styles</Text>
    </CenteredContent>
  ))
  .add('With a custom variant', () => (
    <CenteredContent>
      <Text variant="large">Large variant</Text>
    </CenteredContent>
  ))
  .add('With custom styles', () => (
    <CenteredContent>
      <Text color="blue" fontWeight={600} lineHeight={50} textAlign="center">
        Custom styles
      </Text>
    </CenteredContent>
  ))
  .add('With custom positionning', () => (
    <CenteredContent>
      <Text mt={100} pl={20} paddingY={10}>
        Custom position
      </Text>
    </CenteredContent>
  ));
