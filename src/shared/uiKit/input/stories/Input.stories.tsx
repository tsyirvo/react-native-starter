import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { Box } from '$shared/uiKit';

import { Input } from '../Input';

const meta = {
  title: 'UIKit/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    isEditable: { control: 'boolean' },
  },
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <Box width="100%" p="spacing_16">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

const sharedArgs: ComponentProps<typeof Input> = {
  label: 'Some label',
  placeholder: 'Type here',
};

export const WithLabel: Story = {
  args: sharedArgs,
};

export const WithError: Story = {
  args: {
    ...sharedArgs,
    error: 'An error',
  },
};

export const WithoutLabel: Story = {
  args: {
    value: 'Some value',
  },
};

export const NotEditable: Story = {
  args: {
    ...sharedArgs,
    isEditable: false,
  },
};
