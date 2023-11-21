import React, { useState }from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableNativeFeedback, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import api from '../../../services/api'


import { Container, Header, Steps, Title, Subtitle, Form, FormTitle } from './styles';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export const SignUpSecondStep = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { navigate, goBack } = useNavigation<any>();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  const handleBack = () => {
    goBack();
  }

  const handleRegister = async () => {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha!');
    }

    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não são iguais');
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driverLicense: user.driverLicense,
      password
    })
    .then(() => {
      navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta criada!',
        message: `Agora é só fazer login\ne aproveitar`
      });
    })
    .catch(() => {
      Alert.alert('Opa', 'Não foi possível cadastrar');
    })

  }

  return (
    <KeyboardAvoidingView
      behavior='position'
      enabled
    >
      <TouchableNativeFeedback
        onPress={Keyboard.dismiss}
      >
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua {'\n'} conta
          </Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput 
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />

            <PasswordInput 
              iconName='lock'
              placeholder='Repetir senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />

          </Form>

          <Button
            title='Cadastrar'
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  );
};
