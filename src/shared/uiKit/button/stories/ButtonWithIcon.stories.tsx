import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { action } from 'storybook/actions';

import { ButtonWithIcon as ButtonWithIconComponent } from '../ButtonWithIcon';

const meta = {
  title: 'UIKit/Button/With Icon',
  component: ButtonWithIconComponent,
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
  },
} satisfies Meta<typeof ButtonWithIconComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const sharedArgs: ComponentProps<typeof ButtonWithIconComponent> = {
  children: 'Some CTA',
  iconName: 'Home',
  onPress: action('onPress called'),
};

export const BasicButton: Story = {
  args: sharedArgs,
};

export const ButtonWithVariant: Story = {
  args: {
    ...sharedArgs,
    variant: 'outline',
  },
};

export const ButtonLoading: Story = {
  args: {
    ...sharedArgs,
    isLoading: true,
  },
};

export const ButtonDisabled: Story = {
  args: {
    ...sharedArgs,
    isDisabled: true,
  },
};
