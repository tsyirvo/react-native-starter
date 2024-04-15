/* eslint-disable react/jsx-props-no-spreading */

import { forwardRef } from 'react';
import { TextInput } from 'react-native';
import type { TextInputProps } from 'react-native';

import { makeAppStyles, theme, fontSizes } from '$core/theme';

import { Box, Text } from '../primitives';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  isEditable?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, isEditable = true, ...props }, ref) => {
    const styles = useStyles();

    const errorStyles = error ? styles.errorState : styles.defaultState;

    return (
      <Box width="100%">
        {label ? (
          <Text color="black" mb="spacing_8" testID="inputID-label">
            {label}
          </Text>
        ) : null}

        <TextInput
          ref={ref}
          editable={isEditable}
          placeholderTextColor={theme.colors.secondary_100}
          style={[styles.input, errorStyles]}
          testID="inputID"
          underlineColorAndroid="transparent"
          onChangeText={props.onChangeText}
          {...props}
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

const useStyles = makeAppStyles(({ colors }) => ({
  input: {
    fontSize: fontSizes.regular,
    borderBottomWidth: 1,
    padding: 0,
    paddingBottom: 5,
  },
  defaultState: {
    borderBottomColor: colors.secondary_80,
  },
  errorState: {
    borderBottomColor: colors.red,
  },
}));

Input.displayName = 'Input';
