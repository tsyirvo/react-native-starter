import { usePress } from '$shared/hooks/usePress';
import { Box } from '$shared/uiKit/primitives';

import type * as AllIcons from '../../icons/components';

import { BaseButton } from './BaseButton';
import { InnerIcon } from './components/InnerIcon';
import { InnerText } from './components/InnerText';
import type { ButtonProps } from './types/buttonTypes';

const DEFAULT_ICON_SIZE = 24;

interface ButtonWithIconProps extends ButtonProps {
  children: string;
  iconName: keyof typeof AllIcons;
  width?: number;
  height?: number;
}

const ButtonWithIcon = ({
  onPress,
  variant = 'base',
  testID,
  isDisabled = false,
  isLoading = false,
  iconName,
  width = DEFAULT_ICON_SIZE,
  height = DEFAULT_ICON_SIZE,
  children,
}: ButtonWithIconProps) => {
  const [handlePress, isResolving] = usePress({ onPress });

  const isButtonDisabled = isDisabled || isLoading || isResolving;

  return (
    <BaseButton
      isDisabled={isButtonDisabled}
      isLoading={isLoading || isResolving}
      testID={testID}
      variant={variant}
      onPress={handlePress}
    >
      <Box alignItems="center" flexDirection="row">
        <Box flex={1}>
          <InnerText
            isDisabled={isDisabled}
            isLoading={isResolving || isLoading}
            size="regular"
          >
            {children}
          </InnerText>
        </Box>

        <InnerIcon
          height={height}
          iconName={iconName}
          isLoading={isResolving || isLoading}
          width={width}
        />
      </Box>
    </BaseButton>
  );
};

export { ButtonWithIcon };
