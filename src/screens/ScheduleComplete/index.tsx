import React from 'react'
import { StatusBar, useWindowDimensions } from 'react-native';
//Dimension se usa em components styled components
//o Hook useWindowDimensions é um hook, então só podemos utilizá-lo em componente que retorne algo (jsx).
import { useNavigation } from '@react-navigation/native'

import LogoSvg from '../../assets/images/logo_background_gray.svg';
import DoneSvg from '../../assets/images/done.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles'
import { ConfirmButton } from '../../components/ConfirmButton';

export const ScheduleComplete = () => {
  const { width } = useWindowDimensions()
  const navigation = useNavigation();

  const handleConfirm = () => {
    navigation.navigate('Home' as any);
  }

  return(
    <Container>
      <StatusBar 
        barStyle='light-content'
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg
        width={width}
      />

      <Content>
        <DoneSvg 
          width={80}
          height={80}
        />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title='OK' onPress={handleConfirm} />
      </Footer>
    </Container>
  )
}