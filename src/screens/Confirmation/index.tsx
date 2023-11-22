import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
//Dimension se usa em components styled components
//o Hook useWindowDimensions é um hook, então só podemos utilizá-lo em componente que retorne algo (jsx).

import { Container, Content, Title, Message, Footer } from './styles';
import DoneSvg from '../../assets/images/done.svg';
import LogoSvg from '../../assets/images/logo_background_gray.svg';
import { ConfirmButton } from '../../components/ConfirmButton';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export const Confirmation = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { title, message, nextScreenRoute } = route.params as Params;

  const handleConfirm = () => {
    navigation.navigate(nextScreenRoute);
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>
          {title}
          {/* Carro alugado! */}
        </Title>

        <Message>
          {message}
          {/* Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel. */}
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
};
