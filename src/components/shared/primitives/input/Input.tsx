/* eslint-disable react/jsx-props-no-spreading */

import { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { Box, Text } from '$components/shared/primitives';
import { fontSizes } from '$styles/fonts';
import { makeAppStyles, theme } from '$styles/theme';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  isEditable?: boolean;
};

const useStyles = makeAppStyles(({ colors }) => ({
  input: {
    fontSize: fontSizes.regular,
    borderBottomWidth: 1,
    padding: 0,
    paddingBottom: 5,
  },
  defaultState: {
    borderBottomColor: colors.grey,
  },
  errorState: {
    borderBottomColor: colors.red,
  },
}));

const Input = forwardRef<TextInput, Props>(
  ({ label, error, isEditable = true, ...props }, ref) => {
    const styles = useStyles();

    const errorStyles = error ? styles.errorState : styles.defaultState;

    return (
      <Box width="100%">
        {label && (
          <Text color="black" mb="global_8" testID="inputID-label">
            {label}
          </Text>
        )}

        <TextInput
          ref={ref}
          testID="inputID"
          style={[styles.input, errorStyles]}
          underlineColorAndroid="transparent"
          placeholderTextColor={theme.colors.grey}
          editable={isEditable}
          {...props}
          onChangeText={props.onChangeText}
        />

        {!!error && (
          <Box flexDirection="row" alignItems="center" testID="inputID-error">
            <Text variant="small" color="red">
              {error}
            </Text>
          </Box>
        )}
      </Box>
    );
  },
);

export default Input;
