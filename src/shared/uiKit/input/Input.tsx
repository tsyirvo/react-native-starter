import type { RefObject } from 'react';
import type { TextInputProps } from 'react-native';
import { TextInput, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { DEFAULT_ICON_SIZE } from '$domain/constants/styling';
import { Icon, type IconName } from '$shared/icons';

import { Row, Stack, Text } from '../primitives';

import { InputLabel } from './components/InputLabel';
import { useInputFocusState, useInputStyling } from './hooks';

export interface InputProps extends TextInputProps {
  error?: string;
  helperText?: string;
  isDisabled?: boolean;
  isOptional?: boolean;
  label?: string;
  leftOrnamentIcon?: IconName;
  leftOrnamentIconColor?: string;
  ref?: RefObject<TextInput | null>;
  testID?: string;
}

export const Input = ({
  ref,
  label,
  helperText,
  error,
  isDisabled = false,
  isOptional = false,
  leftOrnamentIcon,
  leftOrnamentIconColor,
  testID = 'Input',
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  ...props
}: InputProps) => {
  const { theme } = useUnistyles();

  const { isFocused, onBlur, onFocus } = useInputFocusState({
    onBlur: onBlurProp,
    onFocus: onFocusProp,
  });
  const { getLineBorderColor, getInputBgColor } = useInputStyling({
    error,
    isDisabled,
    isFocused,
  });

  return (
    <Stack gap="spacing_8" style={styles.container} testID={testID}>
      <InputLabel isOptional={isOptional} label={label} />

      <Row
        gap="spacing_8"
        px="spacing_12"
        style={[styles.inputContainer, getLineBorderColor(), getInputBgColor()]}
      >
        {!!leftOrnamentIcon && (
          <View style={styles.iconContainer}>
            <Icon
              fill={leftOrnamentIconColor}
              height={DEFAULT_ICON_SIZE}
              name={leftOrnamentIcon}
              width={DEFAULT_ICON_SIZE}
            />
          </View>
        )}

        <TextInput
          editable={!isDisabled}
          onBlur={onBlur}
          onChangeText={props.onChangeText}
          onFocus={onFocus}
          placeholderTextColor={theme.colors.content_tertiary}
          ref={ref}
          style={[styles.input, getInputBgColor()]}
          underlineColorAndroid="transparent"
          {...props}
        />
      </Row>

      <Stack gap="spacing_4">
        {!!helperText && (
          <Text color="content_secondary" testID={`${testID}HelperText`}>
            {helperText}
          </Text>
        )}

        {!!error && (
          <Text color="negative" testID={`${testID}ErrorText`}>
            {error}
          </Text>
        )}
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: theme.colors.bg_base,
    borderRadius: theme.borderRadii.radius_8,
    color: theme.colors.content_primary,
    flex: 1,
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSizes.regular,
    padding: theme.spacing.zero,
    paddingVertical: theme.spacing.spacing_8,
  },
  inputContainer: {
    borderRadius: theme.borderRadii.radius_8,
    borderWidth: 1,
  },
}));

Input.displayName = 'Input';
