import { Icon } from '$shared/icons/Icon';

import type * as AllIcons from '../../../icons/components';

type InnerIconProps = {
  iconName: keyof typeof AllIcons;
  width?: number;
  height?: number;
  isLoading?: boolean;
  testID?: string;
};

export const InnerIcon = ({
  iconName,
  width = DEFAULT_ICON_SIZE,
  height = DEFAULT_ICON_SIZE,
  isLoading = false,
  testID = 'InnerIcon',
}: InnerIconProps) => {
  if (isLoading) {
    return null;
  }

  return <Icon height={height} name={iconName} testID={testID} width={width} />;
};

const DEFAULT_ICON_SIZE = 24;
