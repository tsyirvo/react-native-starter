import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { StorybookItem } from '$shared/components';
import { Stack as StackPrimitive, Text } from '$shared/uiKit';

const meta = {
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
          gap="spacing_8"
          justify="space-between"
          style={styles.tallContainer}
        >
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </StackPrimitive>
      </StorybookItem>

      <StorybookItem title="Stack with padding">
        <StackPrimitive gap="spacing_8" p="spacing_24" style={styles.container}>
          <View style={styles.box} />
          <View style={styles.box} />
        </StackPrimitive>
      </StorybookItem>

      <StorybookItem title="Stack with margin">
        <StackPrimitive
          gap="spacing_8"
          mb="spacing_16"
          mt="spacing_16"
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
  title: 'Primitives/Stack',
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Stack: Story = {};

const styles = StyleSheet.create((theme) => ({
  box: {
    backgroundColor: theme.colors.bg_muted,
    borderRadius: theme.borderRadii.radius_4,
    height: 40,
    width: '100%',
  },
  container: {
    backgroundColor: theme.colors.bg_base,
    borderColor: theme.colors.border_default,
    borderRadius: theme.borderRadii.radius_8,
    borderWidth: 1,
    minHeight: 100,
  },
  mediumBox: {
    backgroundColor: theme.colors.bg_muted,
    borderRadius: theme.borderRadii.radius_4,
    height: 40,
    width: 120,
  },
  smallBox: {
    backgroundColor: theme.colors.bg_muted,
    borderRadius: theme.borderRadii.radius_4,
    height: 30,
    width: 80,
  },
  tallContainer: {
    backgroundColor: theme.colors.bg_base,
    borderColor: theme.colors.border_default,
    borderRadius: theme.borderRadii.radius_8,
    borderWidth: 1,
    height: 200,
  },
}));
