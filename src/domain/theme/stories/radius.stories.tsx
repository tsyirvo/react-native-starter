import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Stack, Text } from '$shared/uiKit';

import type { BorderRadii } from '../radius';
import { theme } from '../theme';

const meta = {
  title: 'Theme/Radiuses',
  component: View,
  render: () => (
    <Stack p="spacing_16">
      {(Object.keys(theme.borderRadii) as BorderRadii[]).map((radius) => (
        <Stack key={radius} align="center" mb="spacing_24">
          <Stack mb="spacing_8">
            <Text>{radius}</Text>
          </Stack>

          <View style={[styles.radiusBox, styles.radiusBorder(radius)]} />
        </Stack>
      ))}
    </Stack>
  ),
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Radiuses: Story = {};

const styles = StyleSheet.create((theme) => ({
  radiusBox: {
    backgroundColor: theme.colors.bg_muted,
    borderWidth: 1,
    borderColor: theme.colors.border_default,
    height: 100,
    width: 100,
  },
  radiusBorder: (radius: BorderRadii) => ({
    borderRadius: theme.borderRadii[radius],
  }),
}));
