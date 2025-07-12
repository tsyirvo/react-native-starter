import { t } from 'i18next';
import { z } from 'zod';

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 255;

export const loginFormSchema = z.object({
  email: z.email({ error: t('loginForm.emailField.validation.invalid') }),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, {
      error: t('loginForm.passwordField.validation.minLength'),
    })
    .max(PASSWORD_MAX_LENGTH, {
      error: t('loginForm.passwordField.validation.maxLength'),
    }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
