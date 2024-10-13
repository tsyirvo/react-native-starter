/* eslint-disable react/jsx-props-no-spreading */

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { TextInput } from 'react-native';

import {
  DummyFormSchema,
  type DummyFormSchemaType,
} from '$features/dummyForm/utils/dummyForm.schema';
import { Button } from '$shared/uiKit/button';
import { Input } from '$shared/uiKit/input';
import { Box } from '$shared/uiKit/primitives';

export const DummyFormExample = () => {
  const firstNameInputRef = useRef<TextInput>(null);
  const lastNameInputRef = useRef<TextInput>(null);

  const { t } = useTranslation('miscScreens');

  const { control, handleSubmit } = useForm<DummyFormSchemaType>({
    resolver: zodResolver(DummyFormSchema),
  });

  const onSubmit: SubmitHandler<DummyFormSchemaType> = (data) => {
    // Do your form submission stuff here
    // eslint-disable-next-line no-console
    console.log('data', data);
  };

  return (
    <>
      <Box pb="spacing_16">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <Input
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              error={fieldState.error?.message}
              keyboardType="email-address"
              label={t('dummyForm.form.email.label')}
              placeholder={t('dummyForm.form.email.placeholder')}
              returnKeyType="next"
              testID="dummyForm-input-email"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={() => {
                firstNameInputRef.current?.focus();
              }}
            />
          )}
        />
      </Box>

      <Box pb="spacing_16">
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <Input
              ref={firstNameInputRef}
              autoComplete="name-given"
              error={fieldState.error?.message}
              label={t('dummyForm.form.firstName.label')}
              placeholder={t('dummyForm.form.firstName.placeholder')}
              returnKeyType="next"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={() => {
                lastNameInputRef.current?.focus();
              }}
            />
          )}
        />
      </Box>

      <Box pb="spacing_24">
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <Input
              ref={lastNameInputRef}
              autoComplete="name-family"
              error={fieldState.error?.message}
              label={t('dummyForm.form.lastName.label')}
              placeholder={t('dummyForm.form.lastName.placeholder')}
              returnKeyType="done"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
        />
      </Box>

      <Button.Text
        testID="dummyForm-submitCta"
        onPress={handleSubmit(onSubmit) as (arg: unknown) => Promise<unknown>}
      >
        Submit
      </Button.Text>
    </>
  );
};
