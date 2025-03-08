import React from 'react';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import type { Preview } from '@storybook/react';

import { CenteredContent } from '../src/shared/components';

const preview: Preview = {
  decorators: [
    (Story) => (
      <CenteredContent flex={1}>
        <Story />
      </CenteredContent>
    ),
    withBackgrounds,
  ],

  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1E1E1E' },
        { name: 'light', value: '#FFFFFF' },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
