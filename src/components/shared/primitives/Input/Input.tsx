/* eslint-disable react/jsx-props-no-spreading */

import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styled from 'styled-components';

import theme, { Theme } from '$styles/theme';

import { Box } from '../Box';
import { Text } from '../Text';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  editable?: boolean;
};

const styles = {
  fontSize: theme.fontSizes.regular,
  borderBottomWidth: 1,
  padding: 0,
  paddingBottom: 5,
};

const STextInput = styled(TextInput)<{ error?: string }>`
  border-bottom-color: ${(p: { theme: Theme; error?: string }) =>
    p.error ? p.theme.colors.red : p.theme.colors.grey};
`;

const Input = forwardRef<TextInput, Props>(
  ({ label, error, editable = true, ...props }, ref) => (
    <Box width="80%" mt="medium">
      {label && (
        <Text color="black" mb="small" testID="input-label">
          {label}
        </Text>
      )}

      <STextInput
        ref={ref}
        style={styles}
        underlineColorAndroid="transparent"
        placeholderTextColor={theme.colors.grey}
        editable={editable}
        error={error}
        {...props}
      />

      {!!error && (
        <Box flexDirection="row" alignItems="center" testID="input-error">
          <Text variant="small" color="red">
            {error}
          </Text>
        </Box>
      )}
    </Box>
  ),
);

export default Input;
