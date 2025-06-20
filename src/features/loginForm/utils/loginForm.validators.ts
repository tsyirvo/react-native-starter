import { t } from 'i18next';
import { z } from 'zod';

const EMAIL_MIN_LENGTH = 2;
const EMAIL_MAX_LENGTH = 255;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 255;

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(EMAIL_MIN_LENGTH, t('loginForm.emailField.validation.minLength'))
    .max(EMAIL_MAX_LENGTH, t('loginForm.emailField.validation.maxLength'))
    .email(t('loginForm.emailField.validation.invalid')),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, t('loginForm.passwordField.validation.minLength'))
    .max(
      PASSWORD_MAX_LENGTH,
      t('loginForm.passwordField.validation.maxLength'),
    ),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
