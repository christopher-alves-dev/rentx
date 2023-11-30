import { Feather } from '@expo/vector-icons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import { compare } from 'bcryptjs';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-root-toast';
import { useTheme } from 'styled-components';

import { ProfileFormFields, useFormProfile } from './hooks/useForm';
import * as S from './styles';
import { BackButton } from '../../components/BackButton';
import { BottomSheetPasswordInput } from '../../components/BottomSheetPasswordInput';
import { Button } from '../../components/Button';
import { InputForm } from '../../components/InputForm';
import { InputPasswordForm } from '../../components/InputPasswordForm';
import { LoadAnimation } from '../../components/LoadAnimation';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';

export function Profile() {
  const { user, signOut } = useAuth();
  const { formMethods } = useFormProfile();

  const formsScrollableContainer = useRef<ScrollView>(null);
  const [formSize, setFormSize] = useState(0);

  const [avatar, setAvatar] = useState(user?.avatar);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);
  const bottomTabBarHeight = useBottomTabBarHeight();
  const tabBottomLineAnimation = useSharedValue(0);
  const tabBottomLineWidthAnimation = useSharedValue(100);
  const tabTitleAnimation = useSharedValue(0);

  const submit: SubmitHandler<ProfileFormFields> = (formValues, e) => {
    console.log({ aqui: formValues });
  };

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

  const goToNextStep = () => {
    formMethods.setValue('formType', 'password');
    tabBottomLineAnimation.value = withTiming(200);
    tabBottomLineWidthAnimation.value = withTiming(175);
    tabTitleAnimation.value = withTiming(1);
    formsScrollableContainer?.current?.scrollToEnd();
  };

  const goToPreviousStep = () => {
    formMethods.setValue('formType', 'data');
    tabBottomLineAnimation.value = withTiming(0);
    tabBottomLineWidthAnimation.value = withTiming(100);
    tabTitleAnimation.value = withTiming(0);
    formsScrollableContainer?.current?.scrollTo({ x: 0 });
  };

  const tabBottomLineToNextStyle = useAnimatedStyle(() => {
    return {
      width: tabBottomLineWidthAnimation.value,
      backgroundColor: theme.colors.main,
      transform: [
        {
          translateX: interpolate(
            tabBottomLineAnimation.value,
            [0, 300],
            [27, 260],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const tabDataTitleStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        tabTitleAnimation.value,
        [0, 1],
        [theme.colors.header, theme.colors.textDetail],
      ),
    };
  });

  const tabChangePasswordTitleStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        tabTitleAnimation.value,
        [0, 1],
        [theme.colors.textDetail, theme.colors.header],
      ),
    };
  });

  return (
    <>
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

            <S.Content>
              <S.Tabs>
                <S.TabsWrapper>
                  <S.Tab onPress={goToPreviousStep}>
                    <S.TabTitle style={tabDataTitleStyle}>Dados</S.TabTitle>
                  </S.Tab>
                  <S.Tab onPress={goToNextStep}>
                    <S.TabTitle style={tabChangePasswordTitleStyle}>
                      Trocar senha
                    </S.TabTitle>
                  </S.Tab>
                </S.TabsWrapper>
                <Animated.View
                  style={[
                    tabBottomLineToNextStyle,
                    {
                      height: 3,
                    },
                  ]}
                />
              </S.Tabs>
              {/* Adicionar tipo do form no react hook form, se for dados, eles são obrigatórios e de senha não,
              se for de troca de senha, eles são obrigatórios e os de dados não. */}
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
                  <InputForm
                    control={formMethods.control}
                    name="name"
                    iconName="user"
                  />
                  <InputForm
                    control={formMethods.control}
                    name="email"
                    iconName="mail"
                    keyboardType="email-address"
                  />
                  <InputForm
                    control={formMethods.control}
                    name="driverLicense"
                    iconName="credit-card"
                    keyboardType="numeric"
                  />
                </S.Section>

                <S.Section
                  style={{
                    width: formSize,

                    alignItems: 'center',
                  }}
                >
                  <InputPasswordForm
                    control={formMethods.control}
                    name="currentPassword"
                    iconName="lock"
                    placeholder="Senha atual"
                  />
                  <InputPasswordForm
                    control={formMethods.control}
                    name="newPassword"
                    iconName="lock"
                    placeholder="Nova senha"
                  />
                  <InputPasswordForm
                    control={formMethods.control}
                    name="newPasswordConfirmation"
                    iconName="lock"
                    placeholder="Repetir senha"
                  />
                </S.Section>
              </ScrollView>

              <Button
                title="SALVAR"
                onPress={formMethods.handleSubmit(submit, invalid =>
                  console.log({ invalid }),
                )}
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
    </>
  );
}
