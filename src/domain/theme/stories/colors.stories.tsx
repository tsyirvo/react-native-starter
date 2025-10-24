import type { Meta, StoryObj } from '@storybook/react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Box, Stack, Text } from '$shared/uiKit';

import type { Colors as ThemeColors } from '../colors';
import { theme } from '../theme';

const meta = {
  title: 'Theme/Colors',
  component: View,
  render: () => (
    <ScrollView>
      <Stack p="spacing_16">
        {(Object.keys(theme.colors) as ThemeColors[]).map((color) => (
          <Stack key={color} align="center" mb="spacing_24">
            <Stack pb="spacing_8">
              <Text>{color}</Text>
            </Stack>

            <View style={[styles.colorBox, styles.colorBoxBg(color)]} />
          </Stack>
        ))}
      </Stack>
    </ScrollView>
  ),
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <Box style={styles.wrapper}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Colors: Story = {};

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    width: '100%',
  },
  colorBox: {
    borderWidth: 1,
    borderColor: theme.colors.border_default,
    borderRadius: theme.borderRadii.radius_8,
    width: 100,
    aspectRatio: 1,
  },
  colorBoxBg: (color: ThemeColors) => ({
    backgroundColor: theme.colors[color],
  }),
}));
