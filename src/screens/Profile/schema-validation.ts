import * as yup from 'yup';

const FORM_TYPE_DATA = 'data';
const FORM_TYPE_PASSWORD = 'password';

export const profileSchema = yup.object({
  formType: yup.string().required(),
  name: yup.string().when('formType', {
    is: (formType: string) => formType === FORM_TYPE_DATA,
    then: yup
      .string()
      .required('Campo obrigatório')
      .test('val', val => !!val),
  }),
  email: yup.string().when('formType', {
    is: (formType: string) => formType === FORM_TYPE_DATA,
    then: yup
      .string()
      .required('Campo obrigatório')
      .test('val', val => !!val),
  }),
  driverLicense: yup.string().when('formType', {
    is: (formType: string) => formType === FORM_TYPE_DATA,
    then: yup
      .string()
      .required('Campo obrigatório')
      .test('val', val => !!val),
  }),
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
