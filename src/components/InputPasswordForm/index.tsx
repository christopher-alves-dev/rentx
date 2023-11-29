import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

interface Props extends TextInputProps {
  name: string;
  iconName: React.ComponentProps<typeof Feather>['name']; // queremos tipar apenas os nomes dos icones
  control: any;
}

export const InputPasswordForm = ({
  iconName,
  control,
  name,
  ...rest
}: Props) => {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

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
        secureTextEntry={isPasswordVisible}
        {...rest}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <S.IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.textDetail}
          />
        </S.IconContainer>
      </BorderlessButton>
    </S.Container>
  );
};
