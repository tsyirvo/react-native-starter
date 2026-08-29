import { useUnistyles } from 'react-native-unistyles';

import { DEFAULT_ICON_SIZE } from '$domain/constants/styling';
import type { IconName } from '$shared/icons';
import { Icon } from '$shared/icons';

interface TabBarIconProps {
  iconName: IconName;
  isFocused: boolean;
  testID?: string;
}

export const TabBarIcon = ({
  iconName,
  isFocused,
  testID = 'TabBarIcon',
}: TabBarIconProps) => {
  const { theme } = useUnistyles();

  return (
    <Icon
      fill={
        isFocused ? theme.colors.core_primary : theme.colors.content_secondary
      }
      height={DEFAULT_ICON_SIZE}
      name={iconName}
      testID={testID}
      width={DEFAULT_ICON_SIZE}
    />
  );
};
