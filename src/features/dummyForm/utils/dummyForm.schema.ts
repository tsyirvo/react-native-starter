import i18next from 'i18next';
import { z } from 'zod';

const FIRST_NAME_MIN_LENGTH = 2;
const FIRST_NAME_MAX_LENGTH = 20;
const LAST_NAME_MIN_LENGTH = 2;
const LAST_NAME_MAX_LENGTH = 30;

export const DummyFormSchema = z.object({
  email: z.string().email({
    message: i18next.t('miscScreens:dummyForm.form.email.validation.email'),
  }),
  firstName: z
    .string()
    .min(FIRST_NAME_MIN_LENGTH, {
      message: i18next.t(
        'miscScreens:dummyForm.form.firstName.validation.minLength',
      ),
    })
    .max(FIRST_NAME_MAX_LENGTH, {
      message: i18next.t(
        'miscScreens:dummyForm.form.firstName.validation.maxLength',
      ),
    }),
  lastName: z
    .string()
    .min(LAST_NAME_MIN_LENGTH, {
      message: i18next.t(
        'miscScreens:dummyForm.form.lastName.validation.minLength',
      ),
    })
    .max(LAST_NAME_MAX_LENGTH, {
      message: i18next.t(
        'miscScreens:dummyForm.form.lastName.validation.minLength',
      ),
    }),
});

export type DummyFormSchemaType = z.infer<typeof DummyFormSchema>;
