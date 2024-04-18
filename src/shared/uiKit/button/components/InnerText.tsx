import { Loader } from '$shared/uiKit/Loader';
import { Box, Text } from '$shared/uiKit/primitives';

import type { ButtonProps, ButtonSize } from '../types/buttonTypes';

interface InnerTextProps extends Pick<ButtonProps, 'isDisabled' | 'isLoading'> {
  size?: ButtonSize;
  children: string;
}

const DISABLED_OPACITY = 0.5;
const REGULAR_OPACITY = 1;
const MIN_HEIGHT = 24;

const InnerText = ({
  size,
  isDisabled,
  isLoading,
  children,
}: InnerTextProps) => {
  const isRegularSize = size === 'regular';
  const textVariant = isRegularSize ? 'regular' : 'small';

  if (isLoading) {
    return (
      <Box minHeight={MIN_HEIGHT} testID="buttonInnerLoader">
        <Loader delay={0} size="small" />
      </Box>
    );
  }

  return (
    <Box
      justifyContent="center"
      minHeight={MIN_HEIGHT}
      testID="buttonInnerText"
    >
      <Text
        color="clear"
        numberOfLines={1}
        opacity={isDisabled ? DISABLED_OPACITY : REGULAR_OPACITY}
        textAlign={isRegularSize ? 'center' : 'left'}
        variant={textVariant}
      >
        {children}
      </Text>
    </Box>
  );
};

export { InnerText };
