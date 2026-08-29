import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Loader } from '../../loader';
import { Text } from '../../primitives';
import type { ButtonVariant } from '../buttonVariants';
import type { ButtonProps } from '../types/buttonTypes';
import {
  getLoaderColor,
  getTextColor,
  getTextOpacity,
  getTextVariant,
} from '../utils';

interface InnerTextProps extends Pick<ButtonProps, 'isLoading'> {
  children: string;
  parentVariant: ButtonVariant;
  testID?: string;
}

export const InnerText = ({
  parentVariant,
  isLoading = false,
  children,
  testID = 'InnerText',
}: InnerTextProps) => {
  const textOpacity = getTextOpacity(isLoading);

  return (
    <View style={styles.container} testID={testID}>
      {isLoading ? (
        <View style={styles.loaderContainer} testID={`${testID}Loader`}>
          <Loader
            color={getLoaderColor(parentVariant)}
            delay={0}
            size="small"
          />
        </View>
      ) : null}

      <Text
        color={getTextColor(parentVariant)}
        numberOfLines={1}
        style={{ opacity: textOpacity }}
        variant={getTextVariant(parentVariant)}
      >
        {children}
      </Text>
    </View>
  );
};

const MIN_HEIGHT = 24;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: MIN_HEIGHT,
  },
  loaderContainer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
