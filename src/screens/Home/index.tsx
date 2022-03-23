import React, { useEffect, useState } from 'react'
import { Alert, BackHandler, StatusBar, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native'
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { LoadAnimation } from '../../components/LoadAnimation'
import { Car } from '../../components/Car'

import api from '../../services/api'

import Logo from '../../assets/images/logo.svg'

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles'

import { CarDTO } from '../../dtos/carDTO'

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export const Home = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const [cars, setCars] = useState<CarDTO[]>()
  const [loading, setLoading] = useState(false)

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  
  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  })

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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true); // Previne que ao clicar no botão de voltar (Aquele lá embaixo que é da navegação do celular) no android, ele retorne para tela de splash
    // Para ter prevenir esse comportamento no iOS, precisa adicionar o getureEnabled: false nas Screens do projeto (stack.routes.tsx)
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

        {!loading && (
          <TotalCars>
            Total de {cars?.length} Carros
          </TotalCars>
        )}
        </HeaderContent>
      </Header>

      {loading 
        ? <LoadAnimation /> 
        : (
          <CarList 
            data={cars} 
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
        )}
      
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle, 
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}
        >
          <ButtonAnimated onPress={handleOpenMyCars} style={[styles.button, { backgroundColor: theme.colors.main }]}>
            <Ionicons 
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})