import { usePress } from '$shared/hooks';
import type { IconName } from '$shared/icons';

import { Box } from '../primitives';

import { BaseButton } from './BaseButton';
import { InnerIcon } from './components/InnerIcon';
import { InnerText } from './components/InnerText';
import type { ButtonProps } from './types/buttonTypes';

const DEFAULT_ICON_SIZE = 24;

interface ButtonWithIconProps extends ButtonProps {
  children: string;
  iconName: IconName;
  width?: number;
  height?: number;
  isTextCentered?: boolean;
}

export const ButtonWithIcon = ({
  children,
  iconName,
  variant = 'base',
  isDisabled = false,
  isLoading = false,
  isTextCentered = false,
  targetScale,
  width = DEFAULT_ICON_SIZE,
  height = DEFAULT_ICON_SIZE,
  testID = 'ButtonWithIcon',
  onPress,
}: ButtonWithIconProps) => {
  const [handlePress, isResolving] = usePress({ onPress });

  const isButtonDisabled = isDisabled || isLoading || isResolving;

  return (
    <BaseButton
      isDisabled={isButtonDisabled}
      isLoading={isLoading || isResolving}
      variant={variant}
      targetScale={targetScale}
      testID={testID}
      onPress={handlePress}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent={isTextCentered ? 'center' : 'flex-start'}
      >
        <InnerIcon
          height={height}
          iconName={iconName}
          isLoading={isResolving || isLoading}
          width={width}
        />

        <Box pl="spacing_8">
          <InnerText
            isDisabled={isDisabled}
            isLoading={isResolving || isLoading}
            parentVariant={variant}
          >
            {children}
          </InnerText>
        </Box>
      </Box>
    </BaseButton>
  );
};
