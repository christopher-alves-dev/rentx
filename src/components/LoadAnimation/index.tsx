import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';

import * as S from './styles';
import LoadingCar from '../../assets/images/load_animated.json';

type Props = {
  text?: string;
};

export const LoadAnimation = ({ text = 'Carregando...' }: Props) => {
  return (
    <S.Container>
      <View
        style={{
          position: 'relative',
          alignItems: 'center',
        }}
      >
        <LottieView
          source={LoadingCar}
          style={{ height: 200 }}
          resizeMode="contain"
          autoPlay
        />
        <S.LoadText>{text}</S.LoadText>
      </View>
    </S.Container>
  );
};
