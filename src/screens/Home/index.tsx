import React, { useEffect, useState } from 'react'
import { Alert, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native'

import { Load } from '../../components/Load'
import { Car } from '../../components/Car'

import api from '../../services/api'

import Logo from '../../assets/images/logo.svg'

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton
} from './styles'

import { CarDTO } from '../../dtos/carDTO'

export const Home = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const [cars, setCars] = useState<CarDTO[]>()
  const [loading, setLoading] = useState(false)

  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate('CarDetails', { car });
  }

  const handleOpenMyCars = (car: CarDTO) => {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)
        const { data } = await api.get('/cars');
        setCars(data)
        
      } catch (error) {
        Alert.alert('Something went wrong', error as string);
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])
  
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
            Total de {cars?.length} Carros
          </TotalCars>
        </HeaderContent>
      </Header>

      {loading 
        ? <Load /> 
        : (
          <CarList 
            data={cars} 
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
        )}
      
      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons 
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
        />
      </MyCarsButton>
    </Container>
  )
}