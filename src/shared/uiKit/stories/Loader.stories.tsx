import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from '../Loader';

const meta = {
  title: 'UIKit/Loader',
  component: Loader,
  argTypes: {
    delay: { control: 'number' },
    size: { control: 'select', options: ['large', 'small'] },
  },
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutDelay: Story = {
  args: {
    delay: 0,
  },
};

export const WithLongDelay: Story = {
  args: {
    delay: 3000,
  },
};
