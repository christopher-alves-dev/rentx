import React from 'react';
import { useNavigation } from '@react-navigation/native'

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import speedSvg from '../../assets/images/speed.svg';
import accelerationSvg from '../../assets/images/acceleration.svg';
import forceSvg from '../../assets/images/force.svg';
import gasolineSvg from '../../assets/images/gasoline.svg';
import exchangeSvg from '../../assets/images/exchange.svg';
import peopleSvg from '../../assets/images/people.svg';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period, 
  Price,
  About,
  Accessories,
  Footer
} from './styles'
import { Button } from '../../components/Button';

export const CarDetails = () => {
  const navigation = useNavigation();

  const handleGoBackPage = () => {
    navigation.goBack()
  }

  const handleConfirmRental = () => {
    navigation.navigate('Schedule' as any);
  }

  return (
    <Container>
      <Header>
        <BackButton 
          onPress={handleGoBackPage}
        />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={[
          'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
          ]}
        />
        
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800 HP" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 pessoas" icon={peopleSvg} />
        </Accessories>

        <About>
        Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  )
}