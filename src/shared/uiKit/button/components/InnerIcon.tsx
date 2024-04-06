import { Icon } from '$shared/icons/Icon';

import type * as AllIcons from '../../../icons/components';

const DEFAULT_ICON_SIZE = 24;

type InnerIconProps = {
  iconName: keyof typeof AllIcons;
  width?: number;
  height?: number;
  isLoading?: boolean;
};

const InnerIcon = ({
  iconName,
  width = DEFAULT_ICON_SIZE,
  height = DEFAULT_ICON_SIZE,
  isLoading,
}: InnerIconProps) => {
  if (isLoading) {
    return null;
  }

  return (
    <Icon
      height={height}
      name={iconName}
      testID="buttonInnerIcon"
      width={width}
    />
  );
};

export { InnerIcon };
