import { useUnistyles } from 'react-native-unistyles';

import type { IconName } from '$shared/icons';
import { Icon } from '$shared/icons';

import type { ButtonVariant } from '../buttonVariants';
import { getIconSize, getTextColor } from '../utils';

interface InnerIconProps {
  iconName: IconName;
  isLoading?: boolean;
  parentVariant: ButtonVariant;
  testID?: string;
}

export const InnerIcon = ({
  parentVariant,
  iconName,
  isLoading = false,
  testID = 'InnerIcon',
}: InnerIconProps) => {
  const { theme } = useUnistyles();

  if (isLoading) {
    return null;
  }

  const iconSize = getIconSize(parentVariant);

  return (
    <Icon
      fill={theme.colors[getTextColor(parentVariant)]}
      height={iconSize}
      name={iconName}
      testID={testID}
      width={iconSize}
    />
  );
};
