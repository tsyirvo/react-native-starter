import { usePress } from '$shared/hooks';

import { BaseButton } from './BaseButton';
import { InnerText } from './components/InnerText';
import type { ButtonProps } from './types/buttonTypes';

interface ButtonWithTextProps extends ButtonProps {
  children: string;
  targetScale?: number;
}

export const ButtonWithText = ({
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
      variant={variant}
      isDisabled={isButtonDisabled}
      isLoading={isLoading || isResolving}
      targetScale={targetScale}
      testID={testID}
      onPress={handlePress}
    >
      <InnerText parentVariant={variant} isLoading={isLoading || isResolving}>
        {children}
      </InnerText>
    </BaseButton>
  );
};
