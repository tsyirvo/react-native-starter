import { usePress } from '$shared/hooks';

import { BaseButton } from './BaseButton';
import { InnerText } from './components/InnerText';
import type { ButtonProps } from './types/buttonTypes';

interface ButtonWithTextProps extends ButtonProps {
  children: string;
  isTextCentered?: boolean;
}

export const ButtonWithText = ({
  variant = 'base',
  isDisabled = false,
  isLoading = false,
  isTextCentered = false,
  targetScale,
  children,
  testID = 'ButtonWithText',
  onPress,
}: ButtonWithTextProps) => {
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
      <InnerText
        isDisabled={isDisabled}
        isLoading={isLoading || isResolving}
        isTextCentered={isTextCentered}
        parentVariant={variant}
      >
        {children}
      </InnerText>
    </BaseButton>
  );
};
