import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { action } from 'storybook/actions';

import { ButtonWithText as ButtonWithTextComponent } from '../ButtonWithText';

const meta = {
  title: 'UIKit/Button/Regular',
  component: ButtonWithTextComponent,
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
    onPress: { action: 'onPress' },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    isDisabled: false,
    isLoading: false,
  },
} satisfies Meta<typeof ButtonWithTextComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const sharedArgs: ComponentProps<typeof ButtonWithTextComponent> = {
  children: 'Some CTA',
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
