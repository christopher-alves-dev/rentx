import * as yup from 'yup';

const FORM_TYPE_PASSWORD = 'password';

const DEFAULT_STRING_REQUIRED = yup.string().required('Campo obrigatório');

export const profileSchema = yup.object({
  formType: yup.string().required(),
  name: yup.string(),
  email: DEFAULT_STRING_REQUIRED,
  driverLicense: yup.string(),
  currentPassword: yup.string().when('formType', {
    is: (formType: string) => formType === FORM_TYPE_PASSWORD,
    then: yup
      .string()
      .required('Campo obrigatório')
      .test('val', val => !!val),
  }),
  newPassword: yup.string().when('formType', {
    is: (formType: string) => formType === FORM_TYPE_PASSWORD,
    then: yup
      .string()
      .required('Campo obrigatório')
      .test('val', val => !!val),
  }),
  newPasswordConfirmation: yup.string().when('formType', {
    is: (formType: string) => formType === FORM_TYPE_PASSWORD,
    then: yup
      .string()
      .required('Campo obrigatório')
      .test('val', val => !!val),
  }),
});

export type ProfileFormType = yup.InferType<typeof profileSchema>;
