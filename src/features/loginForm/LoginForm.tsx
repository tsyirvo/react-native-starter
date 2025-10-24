import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View, type TextInput } from 'react-native';

import { UserLogin } from '$domain/entities';
import { Logger } from '$infra/logger';
import { Button, Stack } from '$shared/uiKit';
import { Input } from '$shared/uiKit/input';

import { LoginFormData, loginFormSchema } from './utils';

interface LoginFormProps {
  testID?: string;
  onFormSuccess: (data: UserLogin) => Promise<void>;
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
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: 'test@example.com',
      password: 'superSecretPassword',
    },
  });

  const isValid = Object.keys(errors).length === 0;

  const onSubmit = (data: LoginFormData) => {
    return onFormSuccess(data);
  };

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
      <Stack py="spacing_24" gap="spacing_16">
        <Controller
          control={control}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { isTouched },
          }) => (
            <Input
              testID={`${testID}EmailInput`}
              label={t('loginForm.emailField.label')}
              placeholder={t('loginForm.emailField.placeholder')}
              // leftOrnamentIcon=""
              value={value}
              autoCapitalize="none"
              spellCheck={false}
              keyboardType="email-address"
              returnKeyLabel="next"
              returnKeyType="next"
              error={isTouched ? errors.email?.message : undefined}
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={focusPasswordInput}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { isTouched },
          }) => (
            <Input
              ref={passwordInputRef}
              testID={`${testID}PasswordInput`}
              label={t('loginForm.passwordField.label')}
              placeholder={t('loginForm.passwordField.placeholder')}
              // leftOrnamentIcon="Lock"
              value={value}
              secureTextEntry
              autoCapitalize="none"
              spellCheck={false}
              returnKeyLabel="done"
              returnKeyType="done"
              error={isTouched ? errors.password?.message : undefined}
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={() => {
                handleFormSubmit().catch((error: unknown) => {
                  Logger.error({
                    error,
                    message: 'Failed to submit login form',
                  });
                });
              }}
            />
          )}
          name="password"
        />
      </Stack>

      <Button.Text
        testID={`${testID}SubmitButton`}
        isDisabled={!isValid}
        onPress={handleFormSubmit}
      >
        {t('loginForm.submitButton')}
      </Button.Text>
    </View>
  );
};
