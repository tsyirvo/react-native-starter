/* eslint-disable filename-rules/match */

import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react';
import { View } from 'react-native';

import { Box, Text } from '$shared/uiKit/primitives';

import { spacing, type Spacing as ThemeSpacing } from '../spacing';
import { theme } from '../theme';

const meta = {
  title: 'Theme/Spacing',
  component: View,
  render: () => (
    <Box p="spacing_16">
      {(Object.keys(theme.spacing) as ThemeSpacing[]).map((space) => (
        <Fragment key={space}>
          <Text mb="spacing_8">{space}</Text>

          <Box
            bg="bg_focus"
            height={spacing[space]}
            mb="spacing_32"
            width="100%"
          />
        </Fragment>
      ))}
    </Box>
  ),
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Spacing: Story = {};
