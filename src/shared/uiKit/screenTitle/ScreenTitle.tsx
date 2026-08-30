import { Stack } from 'expo-router';
import type { ComponentProps } from 'react';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

type ToolbarButtonProps = ComponentProps<typeof Stack.Toolbar.Button>;
type ToolbarProps = ComponentProps<typeof Stack.Toolbar>;

export interface ScreenTitleToolbarItem {
  icon?: ToolbarButtonProps['icon'];
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

export const ScreenTitle = ({
  isLarge = false,
  title,
  toolbar,
  toolbarPlacement = 'right',
}: ScreenTitleProps) => {
  const { theme } = useUnistyles();

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
        <Stack.Toolbar
          placement={toolbarPlacement}
          tintColor={theme.colors.core_primary}
        >
          {toolbar?.map((item) => (
            <Stack.Toolbar.Button
              accessibilityLabel={item.label}
              disabled={item.isDisabled}
              icon={item.icon}
              key={item.id}
              onPress={item.onPress}
              tintColor={theme.colors.core_primary}
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
