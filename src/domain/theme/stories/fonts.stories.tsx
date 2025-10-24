import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { Stack, Text } from '$shared/uiKit';

import type { FontSizes as ThemeFontSizes } from '../fonts';
import { fontSizes } from '../fonts';

const meta = {
  title: 'Theme/FontSizes',
  component: View,
  render: () => (
    <Stack p="spacing_16">
      {(Object.keys(fontSizes) as ThemeFontSizes[]).map((size) => (
        <Stack key={size} mb="spacing_24">
          <Text variant={size}>{`This is a ${size} text`}</Text>
        </Stack>
      ))}
    </Stack>
  ),
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FontSizes: Story = {};
