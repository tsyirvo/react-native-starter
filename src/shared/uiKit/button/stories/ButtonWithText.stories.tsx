import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { CenteredContent } from '$shared/components/storybook/CenteredContent';

import { ButtonWithText } from '../ButtonWithText';

const meta = {
  title: 'UIKit/Button/WithText',
  component: ButtonWithText,
  argTypes: {
    variant: {
      control: 'select',
      options: ['base', 'outline'],
    },
    onPress: { action: 'onPress' },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
  args: {
    variant: 'base',
    isTextCentered: false,
    isDisabled: false,
    isLoading: false,
    onPress: action('onPress called'),
  },
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <CenteredContent flex={1}>
        <Story />
      </CenteredContent>
    ),
  ],
} satisfies Meta<typeof ButtonWithText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithText: Story = {
  args: {
    children: 'Some CTA',
  },
};
