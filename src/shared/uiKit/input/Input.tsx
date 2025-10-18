import { RefObject } from 'react';
import type { TextInputProps } from 'react-native';
import { TextInput } from 'react-native';

import { DEFAULT_ICON_SIZE } from '$domain/constants/styling';
import {
  fontFamily,
  fontSizes,
  makeAppStyles,
  useAppTheme,
} from '$domain/theme';
import { Icon, IconName } from '$shared/icons';

import { Box, Text } from '../primitives';

import { InputLabel } from './components/InputLabel';
import { useInputFocusState, useInputStyling } from './hooks';

export interface InputProps extends TextInputProps {
  ref?: RefObject<TextInput | null>;
  label?: string;
  helperText?: string;
  error?: string;
  isDisabled?: boolean;
  isOptional?: boolean;
  leftOrnamentIcon?: IconName;
  leftOrnamentIconColor?: string;
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
  const { colors } = useAppTheme();
  const styles = useStyles();

  const { isFocused, onBlur, onFocus } = useInputFocusState({
    onFocus: onFocusProp,
    onBlur: onBlurProp,
  });
  const { getLineBorderColor, getInputBgColor } = useInputStyling({
    isFocused,
    isDisabled,
    error,
  });

  return (
    <Box width="100%" gap="spacing_8" testID={testID}>
      <InputLabel label={label} isOptional={isOptional} />

      <Box
        flexDirection="row"
        px="spacing_12"
        gap="spacing_8"
        borderWidth={1}
        borderRadius="radius_8"
        style={[getLineBorderColor(), getInputBgColor()]}
      >
        {!!leftOrnamentIcon && (
          <Box alignItems="center" justifyContent="center">
            <Icon
              name={leftOrnamentIcon}
              color={leftOrnamentIconColor}
              width={DEFAULT_ICON_SIZE}
              height={DEFAULT_ICON_SIZE}
            />
          </Box>
        )}

        <TextInput
          ref={ref}
          editable={!isDisabled}
          placeholderTextColor={colors.content_tertiary}
          style={[styles.input, getInputBgColor()]}
          underlineColorAndroid="transparent"
          onChangeText={props.onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      </Box>

      <Box gap="spacing_4">
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
      </Box>
    </Box>
  );
};

const useStyles = makeAppStyles(({ colors, spacing, borderRadii }) => ({
  input: {
    flex: 1,
    fontSize: fontSizes.regular,
    fontFamily: fontFamily.regular,
    backgroundColor: colors.bg_base,
    color: colors.content_primary,
    padding: spacing.zero,
    paddingVertical: spacing.spacing_8,
    borderRadius: borderRadii.radius_8,
  },
}));

Input.displayName = 'Input';
