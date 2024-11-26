import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';

import { StorybookItem } from '$shared/components';
import { Box as BoxPrimitive } from '$shared/uiKit/primitives';

const meta = {
  title: 'Primitives/Box',
  component: View,
  render: () => (
    <BoxPrimitive p="spacing_16">
      <StorybookItem title="Box with a size, color and radiuses">
        <BoxPrimitive
          bg="bg_focus"
          borderRadius="radius_8"
          height={100}
          width={100}
        />
      </StorybookItem>

      <StorybookItem title="Box with border props and full width">
        <BoxPrimitive
          bg="bg_focus"
          borderBottomColor="positive"
          borderBottomWidth={4}
          height={50}
          width="100%"
        />
      </StorybookItem>

      <StorybookItem title="Box with position props and odd size">
        <BoxPrimitive
          bg="bg_focus"
          height={50}
          left={50}
          mb="spacing_32"
          width={100}
        />
      </StorybookItem>
    </BoxPrimitive>
  ),
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Box: Story = {};
