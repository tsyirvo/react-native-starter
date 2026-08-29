import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { action } from 'storybook/actions';

import { ButtonWithIcon as ButtonWithIconComponent } from '../ButtonWithIcon';

const meta = {
  args: {
    variant: 'primary',
  },
  argTypes: {
    iconName: {
      control: 'select',
      options: ['Home', 'Apps', 'Envelope', 'Key', 'User'],
    },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    onPress: { action: 'onPress' },
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
  },
  component: ButtonWithIconComponent,
  title: 'UIKit/Button/With Icon',
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
