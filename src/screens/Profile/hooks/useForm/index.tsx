import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../../../hooks/auth';
import { ProfileFormType, profileSchema } from '../../schema-validation';

export type ProfileFormFields = {
  formType: string;
  name?: string;
  email?: string;
  driverLicense?: string;
};

export const useFormProfile = () => {
  const { user } = useAuth();
  const formMethods = useForm<ProfileFormType>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      formType: 'data',
      name: user?.name,
      email: user?.email,
      driverLicense: user?.driverLicense,
    },
  });

  return {
    formMethods,
  };
};
