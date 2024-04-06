import { usePress } from '$shared/hooks/usePress';

import { BaseButton } from './BaseButton';
import { InnerText } from './components/InnerText';
import type { ButtonProps, ButtonSize } from './types/buttonTypes';

interface ButtonWithTextProps extends ButtonProps {
  children: string;
  size?: ButtonSize;
}

const ButtonWithText = ({
  onPress,
  variant = 'base',
  testID,
  isDisabled = false,
  isLoading = false,
  size = 'regular',
  children,
}: ButtonWithTextProps) => {
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
      <InnerText
        isDisabled={isDisabled}
        isLoading={isLoading || isResolving}
        size={size}
      >
        {children}
      </InnerText>
    </BaseButton>
  );
};

export { ButtonWithText };
