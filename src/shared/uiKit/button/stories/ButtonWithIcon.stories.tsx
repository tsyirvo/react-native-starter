import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { ButtonWithIcon } from '../ButtonWithIcon';

const meta = {
  title: 'UIKit/Button/WithIcon',
  component: ButtonWithIcon,
  argTypes: {
    variant: {
      control: 'select',
      options: ['base', 'outline'],
    },
    iconName: {
      control: 'select',
      options: ['Code', 'Grid', 'HeartRate', 'Laptop'],
    },
    width: { control: 'number' },
    height: { control: 'number' },
    onPress: { action: 'onPress' },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
  args: {
    variant: 'base',
    iconName: 'Code',
    width: 24,
    height: 24,
    onPress: action('onPress called'),
  },
} satisfies Meta<typeof ButtonWithIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  args: {
    children: 'Some CTA',
  },
};
