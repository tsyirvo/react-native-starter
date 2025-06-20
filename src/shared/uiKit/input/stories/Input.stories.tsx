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
    isDisabled: { control: 'boolean' },
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
    ...sharedArgs,
    label: undefined,
  },
};

export const NotEditable: Story = {
  args: {
    ...sharedArgs,
    isDisabled: true,
  },
};

export const WithHelperText: Story = {
  args: {
    ...sharedArgs,
    helperText: 'Some helper text',
  },
};

export const WithHelperTextAndError: Story = {
  args: {
    ...sharedArgs,
    helperText: 'Some helper text',
    error: 'Some error',
  },
};

export const WithOrnamentIcon: Story = {
  args: {
    ...sharedArgs,
    leftOrnamentIcon: 'Home',
    leftOrnamentIconColor: '#0C0D0F',
  },
};
