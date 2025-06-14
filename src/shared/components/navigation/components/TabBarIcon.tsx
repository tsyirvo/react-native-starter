import React from 'react';

import { DEFAULT_ICON_SIZE } from '$domain/constants/styling';
import { useAppTheme } from '$domain/theme';
import type { IconName } from '$shared/icons';
import { Icon } from '$shared/icons';

interface TabBarIconProps {
  iconName: IconName;
  isFocused: boolean;
}

export const TabBarIcon = ({ iconName, isFocused }: TabBarIconProps) => {
  const { colors } = useAppTheme();

  return (
    <Icon
      name={iconName}
      width={DEFAULT_ICON_SIZE}
      height={DEFAULT_ICON_SIZE}
      color={isFocused ? colors.core_primary : colors.content_secondary}
    />
  );
};
