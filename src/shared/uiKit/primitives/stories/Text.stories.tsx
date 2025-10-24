/* eslint-disable react-native/no-raw-text */

import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { StorybookItem } from '$shared/components';
import { Stack, Text as TextPrimitive } from '$shared/uiKit';

const meta = {
  title: 'Primitives/Text',
  component: View,
  render: () => (
    <Stack p="spacing_16">
      <StorybookItem title="Text without any props">
        <TextPrimitive>Default styles</TextPrimitive>
      </StorybookItem>

      <StorybookItem title="Text with a custom variant">
        <TextPrimitive variant="medium">Large variant</TextPrimitive>
      </StorybookItem>

      <StorybookItem title="Text with custom styles">
        <TextPrimitive color="positive" style={styles.centeredText}>
          Custom styles
        </TextPrimitive>
      </StorybookItem>

      <StorybookItem title="Text with custom positionning">
        <Stack mt="spacing_32" px="spacing_24" py="spacing_8">
          <TextPrimitive>Custom position</TextPrimitive>
        </Stack>
      </StorybookItem>
    </Stack>
  ),
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {};

const styles = StyleSheet.create({
  centeredText: {
    textAlign: 'center',
  },
});
