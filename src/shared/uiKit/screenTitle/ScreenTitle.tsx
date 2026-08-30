import { Stack } from 'expo-router';
import type { ComponentProps } from 'react';
import { type ImageSourcePropType, Platform } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useHeaderTintColor } from '$shared/hooks';

type ToolbarButtonProps = ComponentProps<typeof Stack.Toolbar.Button>;
type ToolbarProps = ComponentProps<typeof Stack.Toolbar>;

export interface ScreenTitleToolbarItem {
  /*
   * Name of the SF Symbol rendered on iOS.
   */
  icon?: ToolbarButtonProps['icon'];
  /*
   * Android only accept an image source, so an XML
   * vector drawable has to be provided for the button to render.
   */
  iconSource?: ImageSourcePropType;
  id: string;
  isDisabled?: boolean;
  label: string;
  onPress: () => void;
  variant?: ToolbarButtonProps['variant'];
}

interface ScreenTitleProps {
  isLarge?: boolean;
  title: string;
  toolbar?: ScreenTitleToolbarItem[];
  toolbarPlacement?: ToolbarProps['placement'];
}

const resolveToolbarIcon = (item: ScreenTitleToolbarItem) =>
  Platform.OS === 'ios' ? item.icon : item.iconSource;

export const ScreenTitle = ({
  isLarge = false,
  title,
  toolbar,
  toolbarPlacement = 'right',
}: ScreenTitleProps) => {
  const tintColor = useHeaderTintColor();

  const hasToolbar = Boolean(toolbar?.length);

  return (
    <>
      <Stack.Title
        large={isLarge}
        largeStyle={styles.largeTitle}
        style={styles.title}
      >
        {title}
      </Stack.Title>

      {hasToolbar ? (
        <Stack.Toolbar placement={toolbarPlacement} tintColor={tintColor}>
          {toolbar?.map((item) => (
            <Stack.Toolbar.Button
              accessibilityLabel={item.label}
              disabled={item.isDisabled}
              icon={resolveToolbarIcon(item)}
              key={item.id}
              onPress={item.onPress}
              tintColor={tintColor}
              variant={item.variant}
            >
              {item.label}
            </Stack.Toolbar.Button>
          ))}
        </Stack.Toolbar>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create((theme) => ({
  largeTitle: {
    color: theme.colors.content_primary,
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSizes.xLarge,
  },
  title: {
    color: theme.colors.content_primary,
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSizes.medium,
  },
}));
