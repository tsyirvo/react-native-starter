import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react';
import { View } from 'react-native';

import { Box, Text } from '$shared/uiKit';

import { spacing, type Spacing as ThemeSpacing } from '../spacing';
import { theme } from '../theme';

const meta = {
  title: 'Theme/Spacing',
  component: View,
  render: () => (
    <Box p="spacing_16">
      {(Object.keys(theme.spacing) as ThemeSpacing[]).map((space) => (
        <Fragment key={space}>
          <Box mb="spacing_8">
            <Text>{space}</Text>
          </Box>

          <Box
            bg="bg_muted"
            height={spacing[space]}
            mb="spacing_32"
            width="100%"
          />
        </Fragment>
      ))}
    </Box>
  ),
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <Box flex={1} justifyContent="center">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Spacing: Story = {};
