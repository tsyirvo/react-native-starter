import { usePress } from '$shared/hooks';
import type { IconName } from '$shared/icons';

import { Row } from '../primitives';
import { BaseButton } from './BaseButton';
import { InnerIcon, InnerText } from './components';
import type { ButtonProps } from './types/buttonTypes';

interface ButtonWithIconProps extends ButtonProps {
  children: string;
  iconName: IconName;
}

export const ButtonWithIcon = ({
  accessibilityHint,
  variant = 'primary',
  iconName,
  isDisabled = false,
  isLoading = false,
  targetScale,
  children,
  testID = 'ButtonWithIcon',
  onPress,
}: ButtonWithIconProps) => {
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
      <Row align="center" gap="spacing_8" justify="center">
        <InnerIcon
          iconName={iconName}
          isLoading={isResolving || isLoading}
          parentVariant={variant}
        />

        <InnerText isLoading={isResolving || isLoading} parentVariant={variant}>
          {children}
        </InnerText>
      </Row>
    </BaseButton>
  );
};
