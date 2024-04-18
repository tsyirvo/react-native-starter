/* eslint-disable react/jsx-props-no-spreading */

import { forwardRef } from 'react';
import { TextInput } from 'react-native';
import type { TextInputProps } from 'react-native';

import { makeAppStyles, theme, fontSizes } from '$core/theme';

import { Box, Text } from '../primitives';

import { useInputFocusState } from './hooks/useInputFocusState';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  isEditable?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, isEditable = true, ...props }, ref) => {
    const styles = useStyles();
    const { isFocused, onBlur, onFocus } = useInputFocusState({
      onFocus: props.onFocus,
      onBlur: props.onBlur,
    });

    const getBorderBottomColor = () => {
      if (isFocused) {
        return styles.focusedState;
      }

      if (error) {
        return styles.errorState;
      }

      return styles.defaultState;
    };

    return (
      <Box width="100%">
        {label ? (
          <Text color="clear" mb="spacing_8" testID="inputID-label">
            {label}
          </Text>
        ) : null}

        <TextInput
          ref={ref}
          editable={isEditable}
          placeholderTextColor={theme.colors.dull}
          style={[styles.input, getBorderBottomColor()]}
          testID="inputID"
          underlineColorAndroid="transparent"
          onChangeText={props.onChangeText}
          {...props}
          onBlur={onBlur}
          onFocus={onFocus}
        />

        {!!error && (
          <Box alignItems="center" flexDirection="row" testID="inputID-error">
            <Text color="negative" variant="small">
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
    color: colors.clear,
    borderBottomWidth: 1,
    padding: 0,
    paddingBottom: 5,
  },
  defaultState: {
    borderBottomColor: colors.dull,
  },
  focusedState: {
    borderBottomColor: colors.primary_clear,
  },
  errorState: {
    borderBottomColor: colors.negative,
  },
}));

Input.displayName = 'Input';
