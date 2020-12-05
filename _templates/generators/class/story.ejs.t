---
to: src/components/<%= h.changeCase.pascalCase(componentName) %>/components/__stories__/<%= h.changeCase.pascalCase(componentName) %>.stories.tsx
---
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react-native';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { withKnobs, text } from '@storybook/addon-knobs';
// import { action } from '@storybook/addon-actions';

import Box from '$shared/Box';

import <%= h.changeCase.pascalCase(componentName) %> from '../<%= h.changeCase.pascalCase(componentName) %>';

addDecorator(withBackgrounds);
addDecorator(withKnobs);

storiesOf('<%= h.changeCase.pascalCase(componentName) %>', module)
  .addParameters({
    backgrounds: [
      { name: 'white', value: '#fff', default: true },
      { name: 'black', value: '#000' },
    ],
  })
  .add('default state', () => (
    <Box flex={1} justifyContent="center" alignItems="center">
      <<%= h.changeCase.pascalCase(componentName) %> someProps={text('Some Props', 'Some value')} />
    </Box>
  ));
