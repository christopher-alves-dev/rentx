import { Feather } from '@expo/vector-icons';
import { BottomSheetTextInputProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';
import React, { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';

import { Container, IconContainer, InputText } from './styles';

interface Props extends BottomSheetTextInputProps {
  name: string;
  iconName: React.ComponentProps<typeof Feather>['name']; // queremos tipar apenas os nomes dos icones
  value?: string;
  control: any;
}

export const BottomSheetPasswordInput = ({
  name,
  iconName,
  value,
  control,
  ...rest
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { field } = useController({
    name,
    control,
    defaultValue: '',
  });

  const theme = useTheme();

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.textDetail
          }
        />
      </IconContainer>

      <InputText
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
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.textDetail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
};
