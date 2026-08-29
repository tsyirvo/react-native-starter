import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { action } from 'storybook/actions';

import { ButtonWithText as ButtonWithTextComponent } from '../ButtonWithText';

const meta = {
  args: {
    isDisabled: false,
    isLoading: false,
    variant: 'primary',
  },
  argTypes: {
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
  component: ButtonWithTextComponent,
  title: 'UIKit/Button/Regular',
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
