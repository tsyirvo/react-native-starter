import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { StorybookItem } from '$shared/components';
import { Stack as StackPrimitive, Text } from '$shared/uiKit';

const meta = {
  title: 'Primitives/Stack',
  component: View,
  render: () => (
    <StackPrimitive p="spacing_16">
      <StorybookItem title="Stack without any props">
        <StackPrimitive style={styles.container}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </StackPrimitive>
      </StorybookItem>

      <StorybookItem title="Stack with gap">
        <StackPrimitive gap="spacing_16" style={styles.container}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </StackPrimitive>
      </StorybookItem>

      <StorybookItem title="Stack with alignment">
        <StackPrimitive align="center" gap="spacing_8" style={styles.container}>
          <View style={styles.smallBox} />
          <View style={styles.mediumBox} />
          <View style={styles.smallBox} />
        </StackPrimitive>
      </StorybookItem>

      <StorybookItem title="Stack with justify">
        <StackPrimitive
          justify="space-between"
          gap="spacing_8"
          style={styles.tallContainer}
        >
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </StackPrimitive>
      </StorybookItem>

      <StorybookItem title="Stack with padding">
        <StackPrimitive p="spacing_24" gap="spacing_8" style={styles.container}>
          <View style={styles.box} />
          <View style={styles.box} />
        </StackPrimitive>
      </StorybookItem>

      <StorybookItem title="Stack with margin">
        <StackPrimitive
          mt="spacing_16"
          mb="spacing_16"
          gap="spacing_8"
          style={styles.container}
        >
          <View style={styles.box} />
          <View style={styles.box} />
        </StackPrimitive>
      </StorybookItem>

      <StorybookItem title="Stack with text content">
        <StackPrimitive gap="spacing_8" p="spacing_16" style={styles.container}>
          <Text variant="large">Large Text</Text>
          <Text>Regular Text</Text>
          <Text variant="small">Small Text</Text>
        </StackPrimitive>
      </StorybookItem>
    </StackPrimitive>
  ),
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Stack: Story = {};

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.bg_base,
    borderWidth: 1,
    borderColor: theme.colors.border_default,
    borderRadius: theme.borderRadii.radius_8,
    minHeight: 100,
  },
  tallContainer: {
    backgroundColor: theme.colors.bg_base,
    borderWidth: 1,
    borderColor: theme.colors.border_default,
    borderRadius: theme.borderRadii.radius_8,
    height: 200,
  },
  box: {
    backgroundColor: theme.colors.bg_muted,
    height: 40,
    width: '100%',
    borderRadius: theme.borderRadii.radius_4,
  },
  smallBox: {
    backgroundColor: theme.colors.bg_muted,
    height: 30,
    width: 80,
    borderRadius: theme.borderRadii.radius_4,
  },
  mediumBox: {
    backgroundColor: theme.colors.bg_muted,
    height: 40,
    width: 120,
    borderRadius: theme.borderRadii.radius_4,
  },
}));
