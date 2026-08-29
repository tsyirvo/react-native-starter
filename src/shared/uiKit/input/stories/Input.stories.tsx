import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { StyleSheet } from 'react-native-unistyles';

import { Box } from '$shared/uiKit';

import { Input as InputComponent } from '../Input';

const meta = {
  argTypes: {
    error: { control: 'text' },
    isDisabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  component: InputComponent,
  decorators: [
    (Story) => (
      <Box p="spacing_16" style={styles.wrapper}>
        <Story />
      </Box>
    ),
  ],
  title: 'UIKit/Input',
} satisfies Meta<typeof InputComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const sharedArgs: ComponentProps<typeof InputComponent> = {
  label: 'Some label',
  placeholder: 'Type here',
};

export const Input: Story = {};

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
    error: 'Some error',
    helperText: 'Some helper text',
  },
};

export const WithOrnamentIcon: Story = {
  args: {
    ...sharedArgs,
    leftOrnamentIcon: 'Home',
    leftOrnamentIconColor: '#0C0D0F',
  },
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
});
