import { usePress } from '$shared/hooks';

import { BaseButton } from './BaseButton';
import { InnerText } from './components';
import type { ButtonProps } from './types/buttonTypes';

interface ButtonWithTextProps extends ButtonProps {
  children: string;
  targetScale?: number;
}

export const ButtonWithText = ({
  accessibilityHint,
  variant = 'primary',
  isDisabled = false,
  isLoading = false,
  targetScale,
  children,
  testID = 'ButtonWithText',
  onPress,
}: ButtonWithTextProps) => {
  const [handlePress, isResolving] = usePress({ onPress });

  const isButtonDisabled = isDisabled || isLoading || isResolving;

  return (
    <BaseButton
      accessibilityHint={accessibilityHint}
      isDisabled={isButtonDisabled}
      isLoading={isLoading || isResolving}
      label={children}
      onPress={handlePress}
      targetScale={targetScale}
      testID={testID}
      variant={variant}
    >
      <InnerText isLoading={isLoading || isResolving} parentVariant={variant}>
        {children}
      </InnerText>
    </BaseButton>
  );
};
