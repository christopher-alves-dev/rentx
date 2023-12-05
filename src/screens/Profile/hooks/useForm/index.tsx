import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../../../hooks/auth';
import { ProfileFormType, profileSchema } from '../../schema-validation';

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
