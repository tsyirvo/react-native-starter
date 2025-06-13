import { useAppTheme } from '$domain/theme';
import type { IconName } from '$shared/icons';
import { Icon } from '$shared/icons';

import { ParentVariant } from '../types/buttonTypes';
import { getIconSize, getTextColor } from '../utils';

interface InnerIconProps {
  parentVariant: ParentVariant;
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
  const { colors } = useAppTheme();

  if (isLoading) return null;

  const iconSize = getIconSize(parentVariant);

  return (
    <Icon
      name={iconName}
      height={iconSize}
      width={iconSize}
      color={colors[getTextColor(parentVariant)]}
      testID={testID}
    />
  );
};
