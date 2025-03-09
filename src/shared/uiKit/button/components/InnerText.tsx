import type { VariantProps } from '@shopify/restyle';

import type { Colors, Theme } from '$domain/theme';

import { Loader } from '../../loader';
import { Box, Text } from '../../primitives';
import type { ButtonProps } from '../types/buttonTypes';

type ParentVariant = VariantProps<Theme, 'buttonVariants'>['variant'];

interface InnerTextProps extends Pick<ButtonProps, 'isDisabled' | 'isLoading'> {
  parentVariant: ParentVariant;
  children: string;
  isTextCentered?: boolean;
  testID?: string;
}

export const InnerText = ({
  parentVariant,
  isDisabled = false,
  isLoading = false,
  isTextCentered = false,
  children,
  testID = 'InnerText',
}: InnerTextProps) => {
  return (
    <Box
      justifyContent="center"
      alignItems={isTextCentered ? 'center' : 'flex-start'}
      minHeight={MIN_HEIGHT}
      testID={testID}
    >
      {isLoading ? (
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          alignItems="center"
          justifyContent="center"
          testID={`${testID}Loader`}
        >
          <Loader delay={0} size="small" color="clear" />
        </Box>
      ) : null}

      <Text
        color={getTextColor(parentVariant)}
        numberOfLines={1}
        opacity={getTextOpacity({ isDisabled, isLoading })}
        variant="regular"
      >
        {children}
      </Text>
    </Box>
  );
};

const LOADING_OPACITY = 0;
const DISABLED_OPACITY = 0.5;
const REGULAR_OPACITY = 1;
const MIN_HEIGHT = 24;

const getTextOpacity = ({
  isDisabled,
  isLoading,
}: {
  isDisabled: boolean;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return LOADING_OPACITY;
  }

  if (isDisabled) {
    return DISABLED_OPACITY;
  }

  return REGULAR_OPACITY;
};

const getTextColor = (variant: ParentVariant): Colors => {
  switch (variant) {
    case 'base':
      return 'clear';
    case 'outline':
      return 'clear';
    default:
      return 'clear';
  }
};
