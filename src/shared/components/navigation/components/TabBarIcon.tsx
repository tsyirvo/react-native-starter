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
      name={iconName}
      width={DEFAULT_ICON_SIZE}
      height={DEFAULT_ICON_SIZE}
      color={
        isFocused ? theme.colors.core_primary : theme.colors.content_secondary
      }
      testID={testID}
    />
  );
};
