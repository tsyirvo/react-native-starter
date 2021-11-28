/* eslint-disable import/no-extraneous-dependencies */

import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { addDecorator, storiesOf } from '@storybook/react-native';
import React from 'react';

import CenteredContent from '$components/shared/CenteredContent';
import { Input } from '$components/shared/primitives';

addDecorator(withKnobs);

storiesOf('Input', module)
  .add('With a label', () => (
    <CenteredContent flex={1} width="80%" alignSelf="center">
      <Input
        label={text('Label', 'Some label')}
        placeholder={text('Placeholder', 'Type here')}
      />
    </CenteredContent>
  ))
  .add('With an error', () => (
    <CenteredContent flex={1} width="80%" alignSelf="center">
      <Input
        label={text('Label', 'Some label')}
        placeholder={text('Placeholder', 'Type here')}
        error={text('Error', 'An error')}
      />
    </CenteredContent>
  ))
  .add('Without label', () => (
    <CenteredContent flex={1} width="80%" alignSelf="center">
      <Input value={text('Value', 'Some value')} />
    </CenteredContent>
  ))
  .add('Not editable', () => (
    <CenteredContent flex={1} width="80%" alignSelf="center">
      <Input
        label={text('Label', 'Some label')}
        placeholder={text('Placeholder', 'Type here')}
        editable={boolean('Editable', false)}
      />
    </CenteredContent>
  ));
