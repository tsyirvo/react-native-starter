import { usePress } from '$shared/hooks';
import type { IconName } from '$shared/icons';

import { Row } from '../primitives';

import { BaseButton } from './BaseButton';
import { InnerIcon } from './components/InnerIcon';
import { InnerText } from './components/InnerText';
import type { ButtonProps } from './types/buttonTypes';

interface ButtonWithIconProps extends ButtonProps {
  children: string;
  iconName: IconName;
}

export const ButtonWithIcon = ({
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
      variant={variant}
      isDisabled={isButtonDisabled}
      isLoading={isLoading || isResolving}
      targetScale={targetScale}
      testID={testID}
      onPress={handlePress}
    >
      <Row align="center" justify="center" gap="spacing_8">
        <InnerIcon
          parentVariant={variant}
          iconName={iconName}
          isLoading={isResolving || isLoading}
        />

        <InnerText parentVariant={variant} isLoading={isResolving || isLoading}>
          {children}
        </InnerText>
      </Row>
    </BaseButton>
  );
};
