import { useForm } from 'react-hook-form';

import { useAuth } from '../../../../hooks/auth';

export type ProfileFormFields = {
  name: string;
  email: string;
  driverLicense: string;
};

export const useFormProfile = () => {
  const { user } = useAuth();
  const formMethods = useForm<ProfileFormFields>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      driverLicense: user?.driverLicense,
    },
  });

  return {
    formMethods,
  };
};
