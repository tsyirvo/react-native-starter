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
  parentVariant: ButtonVariant;
  children: string;
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
            delay={0}
            size="small"
            color={getLoaderColor(parentVariant)}
          />
        </View>
      ) : null}

      <Text
        variant={getTextVariant(parentVariant)}
        color={getTextColor(parentVariant)}
        style={{ opacity: textOpacity }}
        numberOfLines={1}
      >
        {children}
      </Text>
    </View>
  );
};

const MIN_HEIGHT = 24;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: MIN_HEIGHT,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
