import React from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/images/logo.svg'
import { Car } from '../../components/Car'

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles'

export const Home = () => {
  const navigation = useNavigation();

  const carData = {
    brand: 'audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120,
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  }

  const handleCarDetails = () => {
    navigation.navigate('CarDetails');
  }

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent //Faz com que o Header comece desde o início da tela, ficando embaixo do status bar, quase como se o Status Bar tivesse um position relative e o header absolute. 
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />

          <TotalCars>
            Total de 12 Carros
          </TotalCars>
        </HeaderContent>
      </Header>
      <CarList 
        data={[1, 2, 3, 4, 5, 6, 7]} 
        keyExtractor={item => String(item)}
        renderItem={() => <Car data={carData} onPress={handleCarDetails} />}
      />
        
    </Container>
  )
}