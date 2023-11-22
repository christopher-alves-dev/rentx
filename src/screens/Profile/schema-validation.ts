import * as yup from 'yup';

export const profileSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  driverLicense: yup.number().required(),
});
