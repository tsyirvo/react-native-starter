import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { StorybookItem } from '$shared/components';
import { Row as RowPrimitive, Stack, Text } from '$shared/uiKit';

const meta = {
  title: 'Primitives/Row',
  component: View,
  render: () => (
    <Stack p="spacing_16">
      <StorybookItem title="Row without any props">
        <RowPrimitive style={styles.container}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </RowPrimitive>
      </StorybookItem>

      <StorybookItem title="Row with gap">
        <RowPrimitive gap="spacing_16" style={styles.container}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </RowPrimitive>
      </StorybookItem>

      <StorybookItem title="Row with alignment">
        <RowPrimitive align="center" gap="spacing_8" style={styles.container}>
          <View style={styles.smallBox} />
          <View style={styles.tallBox} />
          <View style={styles.smallBox} />
        </RowPrimitive>
      </StorybookItem>

      <StorybookItem title="Row with justify space-between">
        <RowPrimitive justify="space-between" style={styles.wideContainer}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </RowPrimitive>
      </StorybookItem>

      <StorybookItem title="Row with justify center">
        <RowPrimitive justify="center" gap="spacing_8" style={styles.container}>
          <View style={styles.box} />
          <View style={styles.box} />
        </RowPrimitive>
      </StorybookItem>

      <StorybookItem title="Row with padding">
        <RowPrimitive p="spacing_24" gap="spacing_8" style={styles.container}>
          <View style={styles.box} />
          <View style={styles.box} />
        </RowPrimitive>
      </StorybookItem>

      <StorybookItem title="Row with text content">
        <RowPrimitive gap="spacing_12" p="spacing_16" style={styles.container}>
          <Text variant="small">Left</Text>
          <Text>Center</Text>
          <Text variant="large">Right</Text>
        </RowPrimitive>
      </StorybookItem>
    </Stack>
  ),
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Row: Story = {};

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.bg_base,
    borderWidth: 1,
    borderColor: theme.colors.border_default,
    borderRadius: theme.borderRadii.radius_8,
    minHeight: 80,
  },
  wideContainer: {
    backgroundColor: theme.colors.bg_base,
    borderWidth: 1,
    borderColor: theme.colors.border_default,
    borderRadius: theme.borderRadii.radius_8,
    minHeight: 80,
    width: '100%',
  },
  box: {
    backgroundColor: theme.colors.bg_muted,
    height: 40,
    width: 40,
    borderRadius: theme.borderRadii.radius_4,
  },
  smallBox: {
    backgroundColor: theme.colors.bg_muted,
    height: 30,
    width: 30,
    borderRadius: theme.borderRadii.radius_4,
  },
  tallBox: {
    backgroundColor: theme.colors.bg_muted,
    height: 50,
    width: 40,
    borderRadius: theme.borderRadii.radius_4,
  },
}));
