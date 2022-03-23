import React from 'react';
import LottieView from 'lottie-react-native';

import LoadingCar from '../../assets/images/load_animated.json';

import { Container } from './styles';

export const LoadAnimation = () => {
  return (
    <Container>
      <LottieView
        source={LoadingCar}
        style={{ height: 200 }}
        resizeMode='contain'
        autoPlay
      >
        
      </LottieView>
    </Container>
  );
};
