import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';


import {
  Container
} from './styles';

interface Props extends BorderlessButtonProps {
  color?: string;
}

export const BackButton = ({ 
  color,
  ...rest 
}: Props) => {
  const theme = useTheme()
  return (
    <Container {...rest}>
      <MaterialIcons 
        name="chevron-left"
        size={28}
        color={color ? color : theme.colors.text}
      />
    </Container>
  )
}