import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import * as S from './styles';
import { ProfileFormFields } from '../../screens/Profile/hooks/useForm';

interface Props extends TextInputProps {
  name: keyof ProfileFormFields;
  iconName: React.ComponentProps<typeof Feather>['name']; // queremos tipar apenas os nomes dos icones
}

export const InputForm = ({ name, iconName, ...rest }: Props) => {
  const theme = useTheme();
  const { control } = useFormContext();

  const [isFocused, setIsFocused] = useState(false);

  return (
    <S.Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onBlur, onChange, value } }) => {
          return (
            <>
              <S.IconContainer isFocused={isFocused}>
                <Feather
                  name={iconName}
                  size={24}
                  color={
                    isFocused || !!value
                      ? theme.colors.main
                      : theme.colors.textDetail
                  }
                />
              </S.IconContainer>

              <S.InputText
                onFocus={() => {
                  setIsFocused(true);
                }}
                onBlur={() => {
                  setIsFocused(false);
                  onBlur();
                }}
                isFocused={isFocused}
                onChangeText={onChange}
                value={String(value)}
                {...rest}
              />
            </>
          );
        }}
      />
    </S.Container>
  );
};
