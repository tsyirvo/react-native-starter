import type { Meta, StoryObj } from '@storybook/react';

import { Loader as LoaderComponent } from '../Loader';

const meta = {
  args: {
    size: 'large',
  },
  argTypes: {
    delay: { control: 'number' },
    size: { control: 'select', options: ['large', 'small'] },
  },
  component: LoaderComponent,
  title: 'UIKit/Loader',
} satisfies Meta<typeof LoaderComponent>;

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
