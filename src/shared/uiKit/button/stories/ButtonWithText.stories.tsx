import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { ButtonWithText } from '../ButtonWithText';

const meta = {
  title: 'ButtonWithText',
  component: ButtonWithText,
} satisfies Meta<typeof ButtonWithText>;

export default meta;

type Story = StoryObj<typeof meta>;

const sharedProps = {
  onPress: action('onPress called'),
};

export const Basic: Story = {
  args: {
    ...sharedProps,
    children: 'Hello world',
  },
};

export const AnotherExample: Story = {
  args: {
    ...sharedProps,
    children: 'Another example',
  },
};
