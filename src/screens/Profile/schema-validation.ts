import * as yup from 'yup';

const FORM_TYPE_DATA = 'data';
const FORM_TYPE_PASSWORD = 'password';

const DEFAULT_STRING_REQUIRED = yup.string().required();

const REQUIRED_WHEN_FORM_TYPE_DATA = yup.string().when('formType', {
  is: (formType: string) => formType === FORM_TYPE_DATA,
  then: yup
    .string()
    .required('Campo obrigatório')
    .test('val', val => !!val),
});

const REQUIRED_WHEN_FORM_TYPE_PASSWORD = yup.string().when('formType', {
  is: (formType: string) => formType === FORM_TYPE_PASSWORD,
  then: yup
    .string()
    .required('Campo obrigatório')
    .test('val', val => !!val),
});

export const profileSchema = yup.object({
  formType: yup.string().required(),
  user: yup.object({
    name: REQUIRED_WHEN_FORM_TYPE_DATA,
    email: DEFAULT_STRING_REQUIRED,
    driverLicense: REQUIRED_WHEN_FORM_TYPE_DATA,
  }),
  currentPassword: REQUIRED_WHEN_FORM_TYPE_PASSWORD,
  currentPasswordConfirmation: REQUIRED_WHEN_FORM_TYPE_DATA,
  newPassword: REQUIRED_WHEN_FORM_TYPE_PASSWORD,
  newPasswordConfirmation: REQUIRED_WHEN_FORM_TYPE_PASSWORD,
});

export type ProfileFormType = yup.InferType<typeof profileSchema>;
