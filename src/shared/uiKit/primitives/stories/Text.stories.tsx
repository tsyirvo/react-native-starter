/* eslint-disable react-native/no-raw-text */

import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { StorybookItem } from '$shared/components';
import { Box, Text as TextPrimitive } from '$shared/uiKit';

const meta = {
  title: 'Primitives/Text',
  component: View,
  render: () => (
    <Box p="spacing_16">
      <StorybookItem title="Text without any props">
        <TextPrimitive>Default styles</TextPrimitive>
      </StorybookItem>

      <StorybookItem title="Text with a custom variant">
        <TextPrimitive variant="medium">Large variant</TextPrimitive>
      </StorybookItem>

      <StorybookItem title="Text with custom styles">
        <TextPrimitive color="positive" textAlign="center">
          Custom styles
        </TextPrimitive>
      </StorybookItem>

      <StorybookItem title="Text with custom positionning">
        <TextPrimitive mt="spacing_32" ps="spacing_24" py="spacing_8">
          Custom position
        </TextPrimitive>
      </StorybookItem>
    </Box>
  ),
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {};
