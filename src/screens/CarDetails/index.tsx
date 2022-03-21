import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'

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
import { CarDTO } from '../../dtos/carDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Params {
  car: CarDTO;
}

export const CarDetails = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;

  const handleGoBackPage = () => {
    navigation.goBack()
  }

  const handleConfirmRental = () => {
    navigation.navigate('Schedule', { car });
  }

  return (
    <Container>
      <Header>
        <BackButton 
          onPress={handleGoBackPage}
        />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos}
        />
        
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory 
              key={accessory.type}
              name={accessory.name} 
              icon={getAccessoryIcon(accessory.type)} 
            />

          ))}

        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  )
}