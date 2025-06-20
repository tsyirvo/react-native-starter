import { Loader } from '../../loader';
import { Box, Text } from '../../primitives';
import type { ButtonProps, ParentVariant } from '../types/buttonTypes';
import {
  getLoaderColor,
  getTextColor,
  getTextOpacity,
  getTextVariant,
} from '../utils';

interface InnerTextProps extends Pick<ButtonProps, 'isLoading'> {
  parentVariant: ParentVariant;
  children: string;
  testID?: string;
}

export const InnerText = ({
  parentVariant,
  isLoading = false,
  children,
  testID = 'InnerText',
}: InnerTextProps) => {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
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
          <Loader
            delay={0}
            size="small"
            color={getLoaderColor(parentVariant)}
          />
        </Box>
      ) : null}

      <Text
        variant={getTextVariant(parentVariant)}
        color={getTextColor(parentVariant)}
        opacity={getTextOpacity(isLoading)}
        numberOfLines={1}
      >
        {children}
      </Text>
    </Box>
  );
};

const MIN_HEIGHT = 24;
