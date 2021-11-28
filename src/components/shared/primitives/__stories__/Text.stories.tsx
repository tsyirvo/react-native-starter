/* eslint-disable import/no-extraneous-dependencies */

import { select, withKnobs } from '@storybook/addon-knobs';
import { addDecorator, storiesOf } from '@storybook/react-native';
import React from 'react';

import CenteredContent from '$components/shared/CenteredContent';
import { Text } from '$components/shared/primitives';

addDecorator(withKnobs);

storiesOf('Text', module)
  .add('Without any props', () => (
    <CenteredContent>
      <Text>Default styles</Text>
    </CenteredContent>
  ))
  .add('With a custom variant', () => (
    <CenteredContent>
      <Text
        variant={select(
          'Variant',
          ['small', 'medium', 'regular', 'large'],
          'large',
        )}
      >
        Large variant
      </Text>
    </CenteredContent>
  ))
  .add('With custom styles', () => (
    <CenteredContent>
      <Text color="blue" fontWeight={600} lineHeight="50px" textAlign="center">
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
