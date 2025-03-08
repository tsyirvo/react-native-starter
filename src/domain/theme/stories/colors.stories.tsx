/* eslint-disable filename-rules/match */

import type { Meta, StoryObj } from '@storybook/react';
import { ScrollView, View } from 'react-native';

import { Box, Text } from '$shared/uiKit';

import type { Colors as ThemeColors } from '../colors';
import { theme } from '../theme';

const meta = {
  title: 'Theme/Colors',
  component: View,
  render: () => (
    <ScrollView>
      <Box p="spacing_16">
        {(Object.keys(theme.colors) as ThemeColors[]).map((color) => (
          <Box key={color} alignItems="center" mb="spacing_24">
            <Text pb="spacing_8">{color}</Text>

            <Box
              aspectRatio={1}
              bg={color}
              borderRadius="radius_8"
              width={100}
            />
          </Box>
        ))}
      </Box>
    </ScrollView>
  ),
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <Box flex={1} width="100%">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Colors: Story = {};
