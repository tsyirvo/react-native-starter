import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { StorybookItem } from '$shared/components';
import { Box as ContainerPrimitive, Stack, Text } from '$shared/uiKit';

const meta = {
  component: View,
  render: () => (
    <Stack p="spacing_16">
      <StorybookItem title="Container with default flex=1">
        <View style={styles.wrapper}>
          <ContainerPrimitive style={styles.container}>
            <Text>Default container with flex=1</Text>
          </ContainerPrimitive>
        </View>
      </StorybookItem>

      <StorybookItem title="Container with custom flex value">
        <View style={styles.wrapper}>
          <ContainerPrimitive flex={2} style={styles.container}>
            <Text>Container with flex=2</Text>
          </ContainerPrimitive>
          <ContainerPrimitive flex={1} style={styles.secondaryContainer}>
            <Text>Container with flex=1</Text>
          </ContainerPrimitive>
        </View>
      </StorybookItem>

      <StorybookItem title="Container with alignment">
        <View style={styles.wrapper}>
          <ContainerPrimitive
            align="center"
            justify="center"
            style={styles.container}
          >
            <Text>Centered Content</Text>
          </ContainerPrimitive>
        </View>
      </StorybookItem>

      <StorybookItem title="Container with direction=row">
        <View style={styles.wrapper}>
          <ContainerPrimitive
            direction="row"
            gap="spacing_8"
            style={styles.container}
          >
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
          </ContainerPrimitive>
        </View>
      </StorybookItem>

      <StorybookItem title="Container with wrap">
        <View style={styles.wrapper}>
          <ContainerPrimitive
            direction="row"
            gap="spacing_8"
            p="spacing_8"
            style={styles.wideContainer}
            wrap="wrap"
          >
            <View style={styles.mediumBox} />
            <View style={styles.mediumBox} />
            <View style={styles.mediumBox} />
            <View style={styles.mediumBox} />
            <View style={styles.mediumBox} />
          </ContainerPrimitive>
        </View>
      </StorybookItem>

      <StorybookItem title="Container with padding and gap">
        <View style={styles.wrapper}>
          <ContainerPrimitive
            gap="spacing_12"
            p="spacing_24"
            style={styles.container}
          >
            <View style={styles.box} />
            <View style={styles.box} />
          </ContainerPrimitive>
        </View>
      </StorybookItem>

      <StorybookItem title="Container with alignSelf">
        <View style={styles.wrapper}>
          <ContainerPrimitive
            p="spacing_16"
            self="center"
            style={styles.narrowContainer}
          >
            <Text>Centered with alignSelf</Text>
          </ContainerPrimitive>
        </View>
      </StorybookItem>

      <StorybookItem title="Container as vertical stack">
        <View style={styles.wrapper}>
          <ContainerPrimitive
            direction="column"
            gap="spacing_8"
            p="spacing_12"
            style={styles.container}
          >
            <Text>Item 1</Text>
            <Text>Item 2</Text>
            <Text>Item 3</Text>
          </ContainerPrimitive>
        </View>
      </StorybookItem>
    </Stack>
  ),
  title: 'Primitives/Container',
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Container: Story = {};

const styles = StyleSheet.create((theme) => ({
  box: {
    backgroundColor: theme.colors.bg_muted,
    borderRadius: theme.borderRadii.radius_4,
    height: 40,
    width: 40,
  },
  container: {
    backgroundColor: theme.colors.bg_base,
    borderColor: theme.colors.border_default,
    borderRadius: theme.borderRadii.radius_8,
    borderWidth: 1,
  },
  mediumBox: {
    backgroundColor: theme.colors.bg_muted,
    borderRadius: theme.borderRadii.radius_4,
    height: 60,
    width: 80,
  },
  narrowContainer: {
    backgroundColor: theme.colors.bg_base,
    borderColor: theme.colors.border_default,
    borderRadius: theme.borderRadii.radius_8,
    borderWidth: 1,
    width: 200,
  },
  secondaryContainer: {
    backgroundColor: theme.colors.bg_muted,
    borderColor: theme.colors.border_default,
    borderRadius: theme.borderRadii.radius_8,
    borderWidth: 1,
  },
  wideContainer: {
    backgroundColor: theme.colors.bg_base,
    borderColor: theme.colors.border_default,
    borderRadius: theme.borderRadii.radius_8,
    borderWidth: 1,
    width: '100%',
  },
  wrapper: {
    height: 150,
    width: '100%',
  },
}));
