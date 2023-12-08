import { Feather } from '@expo/vector-icons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
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

import { useFormProfile } from './hooks/useForm';
import { ProfileFormType } from './schema-validation';
import * as S from './styles';
import { BackButton } from '../../components/BackButton';
import { BottomSheetPasswordInput } from '../../components/BottomSheetPasswordInput';
import { Button } from '../../components/Button';
import { InputForm } from '../../components/InputForm';
import { InputPasswordForm } from '../../components/InputPasswordForm';
import { LoadAnimation } from '../../components/LoadAnimation';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

export function Profile() {
  const { user, setUser, signOut, validatePassword } = useAuth();
  const { formMethods } = useFormProfile();
  const isFormToUpdatePassword = formMethods.watch('formType') === 'password';
  const formsScrollableContainer = useRef<ScrollView>(null);
  const [formSize, setFormSize] = useState(0);

  const [avatar, setAvatar] = useState('user?.avatar');
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);
  const bottomTabBarHeight = useBottomTabBarHeight();
  const tabBottomLineAnimation = useSharedValue(0);
  const tabBottomLineWidthAnimation = useSharedValue(100);
  const tabTitleAnimation = useSharedValue(0);

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

  const handleUpdateData: SubmitHandler<ProfileFormType> = async formValues => {
    Keyboard.dismiss();
    setLoading(true);
    const isPasswordValid = await validatePassword({
      email: formValues.user.email!,
      password: formValues.currentPasswordConfirmation!,
      callback: () => setLoading(false),
    });

    if (!isPasswordValid) return;

    try {
      const data = {
        name: formValues.user.name!,
        driverLicense: formValues.user.driverLicense!,
        email: formValues.user.email!,
      };

      await api.patch('/users/1', data);
      setUser(oldState => ({
        id: oldState?.id as string,
        ...data,
      }));

      formMethods.setValue('user', data);
      formMethods.resetField('currentPasswordConfirmation');
      Toast.show('Informações atualizadas com sucesso', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: theme.colors.success,
        opacity: 1,
      });
    } catch (error) {
      Toast.show('Erro ao tentar atualizar, tente novamente', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: theme.colors.main,
        opacity: 1,
      });
    } finally {
      setLoading(false);
      bottomSheetRef.current?.close();
    }
  };

  const handleUpdatePassword: SubmitHandler<
    Omit<ProfileFormType, 'currentPasswordConfirmation'>
  > = async formValues => {
    try {
      setLoading(true);

      const isPasswordValid = await validatePassword({
        email: formValues.user.email,
        password: formValues.currentPassword!,
      });

      if (!isPasswordValid) return;

      if (formValues.newPassword !== formValues.newPasswordConfirmation) {
        return Toast.show('A nova senha e confirmação são diferentes', {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: theme.colors.main,
          opacity: 1,
        });
      }

      const data = {
        password: formValues.newPassword,
      };
      await api.patch(`/users/${user?.id}`, data);

      goToPreviousStep();
      formMethods.resetField('currentPassword');
      formMethods.resetField('newPassword');
      formMethods.resetField('newPasswordConfirmation');

      Toast.show('Informações atualizadas com sucesso', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: theme.colors.success,
        opacity: 1,
      });
    } catch (error) {
      Toast.show('Erro ao tentar atualizar, tente novamente', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: theme.colors.main,
        opacity: 1,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
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

            {loading && <LoadAnimation text="Validando senha..." />}
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
                    name="user.name"
                    iconName="user"
                  />
                  <InputForm
                    control={formMethods.control}
                    name="user.email"
                    iconName="mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <InputForm
                    control={formMethods.control}
                    name="user.driverLicense"
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
                    autoCapitalize="none"
                  />
                  <InputPasswordForm
                    control={formMethods.control}
                    name="newPassword"
                    iconName="lock"
                    placeholder="Nova senha"
                    autoCapitalize="none"
                  />
                  <InputPasswordForm
                    control={formMethods.control}
                    name="newPasswordConfirmation"
                    iconName="lock"
                    placeholder="Repetir senha"
                    autoCapitalize="none"
                  />
                </S.Section>
              </ScrollView>

              <Button
                title="SALVAR"
                onPress={
                  isFormToUpdatePassword
                    ? formMethods.handleSubmit(data =>
                        handleUpdatePassword({
                          formType: data.formType,
                          currentPassword: data.currentPassword!,
                          user: {
                            email: data.user.email,
                            name: data.user.name,
                            driverLicense: data.user.driverLicense,
                          },
                          newPassword: data.newPassword,
                          newPasswordConfirmation: data.newPasswordConfirmation,
                        }),
                      )
                    : handleOpenBottomSheet
                }
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
          <LoadAnimation text="Validando senha..." />
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
              control={formMethods.control}
              name="currentPasswordConfirmation"
              iconName="lock"
              autoCapitalize="none"
              placeholder="Senha"
            />
            <View
              style={{
                marginTop: RFValue(16),
                width: '100%',
              }}
            >
              <Button
                title="Confirmar"
                onPress={formMethods.handleSubmit(handleUpdateData, invalid =>
                  console.log({ invalid }),
                )}
              />
            </View>
          </View>
        )}
      </BottomSheet>
    </>
  );
}
