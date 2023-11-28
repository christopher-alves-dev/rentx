import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import * as S from './styles';
import { ProfileFormFields } from '../../screens/Profile/hooks/useForm';

interface Props extends TextInputProps {
  name: keyof ProfileFormFields;
  iconName: React.ComponentProps<typeof Feather>['name']; // queremos tipar apenas os nomes dos icones
  control: any;
}

export const InputForm = ({ name, iconName, control, ...rest }: Props) => {
  const theme = useTheme();
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });

  const [isFocused, setIsFocused] = useState(false);

  return (
    <S.Container>
      <S.IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || !!field.value
              ? theme.colors.main
              : theme.colors.textDetail
          }
        />
      </S.IconContainer>

      <S.InputText
        value={field.value}
        onChangeText={field.onChange}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
          field.onBlur();
        }}
        isFocused={isFocused}
        {...rest}
      />
    </S.Container>
  );
};
