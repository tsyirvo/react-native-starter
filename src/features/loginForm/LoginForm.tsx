import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { type TextInput, View } from 'react-native';

import type { UserLogin } from '$domain/entities';
import { Logger } from '$infra/logger';
import { Button, Stack } from '$shared/uiKit';
import { Input } from '$shared/uiKit/input';

import { type LoginFormData, loginFormSchema } from './utils';

interface LoginFormProps {
  onFormSuccess: (data: UserLogin) => Promise<void>;
  testID?: string;
}

export const LoginForm = ({
  testID = 'LoginForm',
  onFormSuccess,
}: LoginFormProps) => {
  const passwordInputRef = useRef<TextInput>(null);

  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: 'test@example.com',
      password: 'superSecretPassword',
    },
    mode: 'onChange',
    resolver: zodResolver(loginFormSchema),
  });

  const isValid = Object.keys(errors).length === 0;

  const onSubmit = (data: LoginFormData) => onFormSuccess(data);

  const handleFormSubmit = async () => {
    await handleSubmit(onSubmit)();
  };

  const focusPasswordInput = () => {
    requestIdleCallback(() => {
      passwordInputRef.current?.focus();
    });
  };

  return (
    <View testID={testID}>
      <Stack gap="spacing_16" py="spacing_24">
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { isTouched },
          }) => (
            <Input
              autoCapitalize="none"
              error={isTouched ? errors.email?.message : undefined}
              keyboardType="email-address"
              label={t('loginForm.emailField.label')}
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={focusPasswordInput}
              placeholder={t('loginForm.emailField.placeholder')}
              returnKeyLabel="next"
              returnKeyType="next"
              spellCheck={false}
              testID={`${testID}EmailInput`}
              // leftOrnamentIcon=""
              value={value}
            />
          )}
          rules={{ required: true }}
        />

        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { isTouched },
          }) => (
            <Input
              autoCapitalize="none"
              error={isTouched ? errors.password?.message : undefined}
              label={t('loginForm.passwordField.label')}
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={() => {
                handleFormSubmit().catch((error: unknown) => {
                  Logger.error({
                    error,
                    message: 'Failed to submit login form',
                  });
                });
              }}
              placeholder={t('loginForm.passwordField.placeholder')}
              ref={passwordInputRef}
              returnKeyLabel="done"
              returnKeyType="done"
              secureTextEntry
              spellCheck={false}
              testID={`${testID}PasswordInput`}
              // leftOrnamentIcon="Lock"
              value={value}
            />
          )}
          rules={{ required: true }}
        />
      </Stack>

      <Button.Text
        isDisabled={!isValid}
        onPress={handleFormSubmit}
        testID={`${testID}SubmitButton`}
      >
        {t('loginForm.submitButton')}
      </Button.Text>
    </View>
  );
};
