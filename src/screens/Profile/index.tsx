import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import { compare } from 'bcryptjs';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Toast from 'react-native-root-toast';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { RFValue } from 'react-native-responsive-fontsize';
import { BottomSheetPasswordInput } from '../../components/BottomSheetPasswordInput';
import { LoadAnimation } from '../../components/LoadAnimation';
import * as S from './styles'

export function Profile() {
  const { user, signOut } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user?.avatar);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.name);
  const [driverLicense, setDriverLicense] = useState(user?.driverLicense);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);
  const bottomTabBarHeight = useBottomTabBarHeight()

  const onOpen = () => {
    bottomSheetRef.current?.expand();
  };

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  const isPasswordCorrect = async () => {
    let isValid = false

    isValid = await compare(password, "$2a$10$nXCkHcFjQKypL6/pBnTlJe76Gw3UentQLGyKwSa3ZNh1I0DKyedXi");

    return isValid
  }

  async function handleProfileUpdate() {
    setLoading(true)
    const isPasswordValid = await isPasswordCorrect()
    if (!isPasswordValid) {
      Toast.show('Senha incorreta', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        backgroundColor: theme.colors.main,
        opacity: 1
      })

      setLoading(false)
      return
    }
    try {
      // const data = { name, driverLicense, email: user?.email, id: user?.id, password };

      // api.put('/users/1', data)

      // Toast.show('Informações atualizadas com sucesso', {
      //   duration: Toast.durations.SHORT,
      //   position: Toast.positions.CENTER,
      //   backgroundColor: theme.colors.success
      // })

      Toast.show('Informações atualizadas com sucesso', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        backgroundColor: theme.colors.success,
        opacity: 1
      })
      setLoading(false)

      bottomSheetRef.current?.close();
    } catch (error) {
      Toast.show('Erro ao tentar atualizar, tente novamente', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: theme.colors.main,
        opacity: 1
      })
    }
  }

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <>
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <S.Container>
            <S.Header>
              <S.HeaderTop>
                <BackButton
                  color={theme.colors.shape}
                  onPress={handleBack}
                />
                <S.HeaderTitle>Editar Perfil</S.HeaderTitle>
                <S.LogoutButton onPress={signOut}>
                  <Feather
                    name="power" size={24}
                    color={theme.colors.shape}
                  />
                </S.LogoutButton>
              </S.HeaderTop>

              <S.PhotoContainer>
                {!!avatar && <S.Photo source={{ uri: avatar }} />}
                <S.PhotoButton onPress={
                  () => console.log('handleAvatarSelect')
                }>
                  <Feather
                    name="camera"
                    size={24}
                    color={theme.colors.shape}
                  />
                </S.PhotoButton>
              </S.PhotoContainer>
            </S.Header>

            <S.Content style={{ marginBottom: bottomTabBarHeight }}>
              <S.Options>
                <S.Option
                  active={option === 'dataEdit'}
                  onPress={() => console.log('handleOptionChange')
                    //handleOptionChange('dataEdit')
                  }
                >
                  <S.OptionTitle active={option === 'dataEdit'}>
                    Dados
                  </S.OptionTitle>
                </S.Option>
                <S.Option
                  active={option === 'passwordEdit'}
                  onPress={() => console.log('handleOptionChange')
                    // handleOptionChange('passwordEdit')
                  }
                >
                  <S.OptionTitle active={option === 'passwordEdit'}>
                    Trocar senha
                  </S.OptionTitle>
                </S.Option>
              </S.Options>
              {
                option === 'dataEdit'
                  ?
                  <S.Section>
                    <Input
                      iconName="user"
                      placeholder="Nome"
                      autoCorrect={false}
                      defaultValue={user?.name}
                      onChangeText={setName}
                    />
                    <Input
                      iconName="mail"
                      editable={false}
                      defaultValue={user?.email}
                    />
                    <Input
                      iconName="credit-card"
                      placeholder="CNH"
                      keyboardType="numeric"
                      defaultValue={user?.driverLicense}
                      onChangeText={setDriverLicense}
                    />
                  </S.Section>
                  :
                  <S.Section>
                    <PasswordInput
                      iconName="lock"
                      placeholder="Senha atual"
                    />
                    <PasswordInput
                      iconName="lock"
                      placeholder="Nova senha"
                    />
                    <PasswordInput
                      iconName="lock"
                      placeholder="Repetir senha"
                    />
                  </S.Section>
              }
              <Button
                title="Salvar alterações"
                onPress={onOpen}
              />
            </S.Content>
          </S.Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        keyboardBlurBehavior="restore"
        enablePanDownToClose
        backdropComponent={renderBackdrop}
      >
        {loading ? (
          <LoadAnimation />
        ) : (
          <View style={{
            padding: RFValue(20),
            alignItems: 'center'
          }}>
            <S.BottomSheetTitle>Confirmar alteração</S.BottomSheetTitle>
            <S.BottomSheetMessage>Digite sua senha para confirmar as alterações.</S.BottomSheetMessage>
            <BottomSheetPasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <View style={{
              marginTop: RFValue(16),
              width: '100%'
            }}>
              <Button
                title="Confirmar"
                onPress={async () => {
                  Keyboard.dismiss()
                  await handleProfileUpdate()
                }}
              />
            </View>
          </View>
        )}
      </BottomSheet >
    </>
  );
}