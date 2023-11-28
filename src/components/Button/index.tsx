import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface Props extends Omit<RectButtonProps, 'onPress'> {
  title: string;
  loading?: boolean;
  light?: boolean;
  onPress: () => void;
}

export const Button = ({
  title,
  onPress,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}: Props) => {
  const theme = useTheme();

  return (
    <Container {...rest} onPress={onPress} enabled={enabled}>
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
};
