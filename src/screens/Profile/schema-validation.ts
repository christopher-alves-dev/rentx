import * as yup from 'yup';

export const profileSchema = yup.object({
  formType: yup.string().required(),
  name: yup.string().when('formType', {
    is: (formType: string) => formType === 'data',
    then: yup
      .string()
      .required('Campo obrigatório')
      .test('val', val => !!val),
  }),
  email: yup.string().when('formType', {
    is: (formType: string) => formType === 'data',
    then: yup
      .string()
      .required('Campo obrigatório')
      .test('val', val => !!val),
  }),
  driverLicense: yup.string().when('formType', {
    is: (formType: string) => formType === 'data',
    then: yup
      .string()
      .required('Campo obrigatório')
      .test('val', val => !!val),
  }),
});

export type ProfileFormType = yup.InferType<typeof profileSchema>;
