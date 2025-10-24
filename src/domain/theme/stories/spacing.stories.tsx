import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Box, Stack, Text } from '$shared/uiKit';

import { spacing, type Spacing as ThemeSpacing } from '../spacing';
import { theme } from '../theme';

const meta = {
  title: 'Theme/Spacing',
  component: View,
  render: () => (
    <Stack p="spacing_16">
      {(Object.keys(theme.spacing) as ThemeSpacing[]).map((space) => (
        <Fragment key={space}>
          <Stack mb="spacing_8">
            <Text>{space}</Text>
          </Stack>

          <View style={[styles.spacingBox, { height: spacing[space] }]} />
        </Fragment>
      ))}
    </Stack>
  ),
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <Box justify="center">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Spacing: Story = {};

const styles = StyleSheet.create((theme) => ({
  spacingBox: {
    backgroundColor: theme.colors.bg_muted,
    marginBottom: theme.spacing.spacing_32,
    width: '100%',
  },
}));
