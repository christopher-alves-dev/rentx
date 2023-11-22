import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as Yup from 'yup';

import { Container, Footer, Form, Header, Subtitle, Title } from './styles';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();
  const { navigate } = useNavigation<any>();
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),
      password: Yup.string().required('A senha é obrigatória'),
    });

    await schema.validate({ email, password });

    signIn({ email, password });
  };

  const handleNewAccount = () => {
    navigate('SignUpFirstStep');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Header>
          <Title>Estamos {'\n'}quase lá.</Title>
          <Subtitle>
            Faça seu login para começar{'\n'}
            uma experiência incrível.
          </Subtitle>
        </Header>

        <Form>
          <Input
            iconName="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />

          <PasswordInput
            iconName="lock"
            placeholder="Senha"
            onChangeText={setPassword}
            value={password}
          />
        </Form>

        <Footer>
          <Button
            title="Login"
            onPress={handleSignIn}
            enabled
            loading={false}
          />

          <Button
            title="Criar conta gratuita"
            color={theme.colors.backgroundSecondary}
            onPress={handleNewAccount}
            enabled
            loading={false}
            light
          />
        </Footer>
      </Container>
    </TouchableWithoutFeedback>
  );
};
