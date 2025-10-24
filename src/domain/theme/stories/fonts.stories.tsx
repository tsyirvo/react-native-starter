import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { Box, Text } from '$shared/uiKit';

import type { FontSizes as ThemeFontSizes } from '../fonts';
import { fontSizes } from '../fonts';

const meta = {
  title: 'Theme/FontSizes',
  component: View,
  render: () => (
    <Box p="spacing_16">
      {(Object.keys(fontSizes) as ThemeFontSizes[]).map((size) => (
        <Box key={size} mb="spacing_24">
          <Text variant={size}>{`This is a ${size} text`}</Text>
        </Box>
      ))}
    </Box>
  ),
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FontSizes: Story = {};
