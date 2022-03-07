import React from 'react';
import { useTheme } from 'styled-components';

import {
  Container,
  Title
} from './styles'

interface Props {
  title: string;
  color?: string | undefined;
  onPress: () => void;
}

export const Button = ({
  title,
  color,
  onPress
}: Props) => {
  const theme = useTheme();
  return (
    <Container color={color ? color : theme.colors.main} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  )
}