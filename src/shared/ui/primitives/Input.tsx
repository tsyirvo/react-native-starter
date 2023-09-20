/* eslint-disable react/jsx-props-no-spreading */

import { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { makeAppStyles, theme, fontSizes } from '$core/theme';

import { Box } from './Box';
import { Text } from './Text';

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

export const Input = forwardRef<TextInput, Props>(
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
          editable={isEditable}
          placeholderTextColor={theme.colors.grey}
          style={[styles.input, errorStyles]}
          testID="inputID"
          underlineColorAndroid="transparent"
          {...props}
          onChangeText={props.onChangeText}
        />

        {!!error && (
          <Box alignItems="center" flexDirection="row" testID="inputID-error">
            <Text color="red" variant="small">
              {error}
            </Text>
          </Box>
        )}
      </Box>
    );
  },
);
