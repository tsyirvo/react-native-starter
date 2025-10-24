import { useUnistyles } from 'react-native-unistyles';

import type { IconName } from '$shared/icons';
import { Icon } from '$shared/icons';

import type { ButtonVariant } from '../buttonVariants';
import { getIconSize, getTextColor } from '../utils';

interface InnerIconProps {
  parentVariant: ButtonVariant;
  iconName: IconName;
  isLoading?: boolean;
  testID?: string;
}

export const InnerIcon = ({
  parentVariant,
  iconName,
  isLoading = false,
  testID = 'InnerIcon',
}: InnerIconProps) => {
  const { theme } = useUnistyles();

  if (isLoading) return null;

  const iconSize = getIconSize(parentVariant);

  return (
    <Icon
      name={iconName}
      height={iconSize}
      width={iconSize}
      color={theme.colors[getTextColor(parentVariant)]}
      testID={testID}
    />
  );
};
