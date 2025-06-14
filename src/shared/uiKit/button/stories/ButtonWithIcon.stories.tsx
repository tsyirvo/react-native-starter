import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { ButtonWithIcon } from '../ButtonWithIcon';

const meta = {
  title: 'UIKit/Button/WithIcon',
  component: ButtonWithIcon,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'primary_compact',
        'outline',
        'outline_compact',
        'text',
        'text_compact',
      ],
    },
    iconName: {
      control: 'select',
      options: ['Home', 'Apps', 'Envelope', 'Key', 'User'],
    },
    onPress: { action: 'onPress' },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    iconName: 'Home',
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
