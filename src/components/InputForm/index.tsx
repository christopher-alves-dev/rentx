import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

interface Props<T extends FieldValues> extends TextInputProps {
  name: FieldPath<T>;
  iconName: React.ComponentProps<typeof Feather>['name'];
  control: Control<T>;
}

export const InputForm = <T extends FieldValues>({
  name,
  iconName,
  control,
  ...rest
}: Props<T>) => {
  const theme = useTheme();
  const { field } = useController({
    control,
    name,
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
