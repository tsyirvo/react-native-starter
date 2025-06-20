import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { Box, Text } from '$shared/uiKit';

import type { BorderRadii } from '../radius';
import { theme } from '../theme';

const meta = {
  title: 'Theme/Radiuses',
  component: View,
  render: () => (
    <Box p="spacing_16">
      {(Object.keys(theme.borderRadii) as BorderRadii[]).map((radius) => (
        <Box key={radius} alignItems="center" mb="spacing_24">
          <Text mb="spacing_8">{radius}</Text>

          <Box
            bg="bg_muted"
            borderWidth={1}
            borderColor="border_default"
            borderRadius={radius}
            height={100}
            width={100}
          />
        </Box>
      ))}
    </Box>
  ),
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Radiuses: Story = {};
