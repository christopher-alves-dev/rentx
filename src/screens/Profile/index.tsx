import { Feather } from '@expo/vector-icons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import { compare } from 'bcryptjs';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-root-toast';
import { useTheme } from 'styled-components';

import { useFormProfile } from './hooks/useForm';
import * as S from './styles';
import { BackButton } from '../../components/BackButton';
import { BottomSheetPasswordInput } from '../../components/BottomSheetPasswordInput';
import { Button } from '../../components/Button';
import { InputForm } from '../../components/InputForm';
import { LoadAnimation } from '../../components/LoadAnimation';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';

export function Profile() {
  const { user, signOut } = useAuth();
  const { formMethods } = useFormProfile();
  const formsScrollableContainer = useRef<ScrollView>(null);
  const { width } = Dimensions.get('window');
  const [formSize, setFormSize] = useState(0);

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user?.avatar);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);
  const bottomTabBarHeight = useBottomTabBarHeight();

  const onOpen = () => {
    bottomSheetRef.current?.expand();
  };

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  const isPasswordCorrect = async () => {
    let isValid = false;

    isValid = await compare(
      password,
      '$2a$10$nXCkHcFjQKypL6/pBnTlJe76Gw3UentQLGyKwSa3ZNh1I0DKyedXi',
    );

    return isValid;
  };

  async function handleProfileUpdate() {
    setLoading(true);
    const isPasswordValid = await isPasswordCorrect();
    if (!isPasswordValid) {
      Toast.show('Senha incorreta', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        backgroundColor: theme.colors.main,
        opacity: 1,
      });

      setLoading(false);
      return;
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
        opacity: 1,
      });
      setLoading(false);

      bottomSheetRef.current?.close();
    } catch (error) {
      Toast.show('Erro ao tentar atualizar, tente novamente', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor: theme.colors.main,
        opacity: 1,
      });
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
    [],
  );

  const goToNextStep = () => formsScrollableContainer?.current?.scrollToEnd();

  const goToPreviousStep = () =>
    formsScrollableContainer?.current?.scrollTo({ x: 0 });

  return (
    <FormProvider {...formMethods}>
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <S.Container>
            <S.Header>
              <S.HeaderTop>
                <BackButton color={theme.colors.shape} onPress={handleBack} />
                <S.HeaderTitle>Editar Perfil</S.HeaderTitle>
                <S.LogoutButton onPress={signOut}>
                  <Feather name="power" size={24} color={theme.colors.shape} />
                </S.LogoutButton>
              </S.HeaderTop>

              <S.PhotoContainer>
                {!!avatar && <S.Photo source={{ uri: avatar }} />}
                <S.PhotoButton
                  onPress={() => console.log('handleAvatarSelect')}
                >
                  <Feather name="camera" size={24} color={theme.colors.shape} />
                </S.PhotoButton>
              </S.PhotoContainer>
            </S.Header>

            <S.Content style={{ marginBottom: bottomTabBarHeight }}>
              <S.Options>
                <S.Option
                  active={option === 'dataEdit'}
                  onPress={
                    goToPreviousStep
                    //handleOptionChange('dataEdit')
                  }
                >
                  <S.OptionTitle active={option === 'dataEdit'}>
                    Dados
                  </S.OptionTitle>
                </S.Option>
                <S.Option
                  active={option === 'passwordEdit'}
                  onPress={
                    goToNextStep
                    // handleOptionChange('passwordEdit')
                  }
                >
                  <S.OptionTitle active={option === 'passwordEdit'}>
                    Trocar senha
                  </S.OptionTitle>
                </S.Option>
              </S.Options>
              {/* Adicionar tipo do form no react hook form, se for dados, eles são obrigatórios e de senha não,
              se for de troca de senha, eles são obrigatórios e os de dados não. */}
              {/* Fazer a transição entre os forms através de um useRef e scrollando. */}
              <ScrollView
                horizontal
                style={{
                  flexGrow: 1,
                }}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                scrollEnabled={false}
                onLayout={event => setFormSize(event.nativeEvent.layout.width)}
                ref={formsScrollableContainer}
              >
                <S.Section
                  style={{
                    width: formSize,
                    alignItems: 'center',
                  }}
                >
                  <InputForm name="name" iconName="user" />
                  <InputForm name="email" iconName="mail" />
                  <InputForm name="driverLicense" iconName="credit-card" />
                  <Button title="Salvar alterações" onPress={onOpen} />
                </S.Section>

                <S.Section
                  style={{
                    // width,
                    width: formSize,

                    alignItems: 'center',
                  }}
                >
                  <PasswordInput iconName="lock" placeholder="Senha atual" />
                  <PasswordInput iconName="lock" placeholder="Nova senha" />
                  <PasswordInput iconName="lock" placeholder="Repetir senha" />
                </S.Section>
                {/* {option === 'dataEdit' ? (
                ) : (
                  <S.Section>
                    <PasswordInput iconName="lock" placeholder="Senha atual" />
                    <PasswordInput iconName="lock" placeholder="Nova senha" />
                    <PasswordInput
                      iconName="lock"
                      placeholder="Repetir senha"
                    />
                  </S.Section>
                )} */}
              </ScrollView>
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
          <View
            style={{
              padding: RFValue(20),
              alignItems: 'center',
            }}
          >
            <S.BottomSheetTitle>Confirmar alteração</S.BottomSheetTitle>
            <S.BottomSheetMessage>
              Digite sua senha para confirmar as alterações.
            </S.BottomSheetMessage>
            <BottomSheetPasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <View
              style={{
                marginTop: RFValue(16),
                width: '100%',
              }}
            >
              <Button
                title="Confirmar"
                onPress={async () => {
                  Keyboard.dismiss();
                  await handleProfileUpdate();
                }}
              />
            </View>
          </View>
        )}
      </BottomSheet>
    </FormProvider>
  );
}
