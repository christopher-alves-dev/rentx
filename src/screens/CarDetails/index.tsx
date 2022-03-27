import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { StatusBar, StyleSheet } from 'react-native';

import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period, 
  Price,
  About,
  Accessories,
  Footer,
  CarImages
} from './styles'

import { CarDTO } from '../../dtos/carDTO';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import theme from '../../styles/theme';
interface Params {
  car: CarDTO;
}

export const CarDetails = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;

  const scrollY = useSharedValue(0);
  const scrollhandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
    console.log(event.contentOffset.y)
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value, 
        [0, 200],
        [200, 80],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  const handleGoBackPage = () => {
    navigation.goBack()
  }

  const handleConfirmRental = () => {
    navigation.navigate('Schedule', { car });
  }

  return (
    <Container>
      <StatusBar 
        barStyle='dark-content'
        translucent
        backgroundColor='transparent'
      />

      <Animated.View
        style={[headerStyleAnimation, styles.header, { backgroundColor: theme.colors.background_secondary }]}
      >
        <Header>
          <BackButton 
            onPress={handleGoBackPage}
          />
        </Header>

        <Animated.View
          style={sliderCarsStyleAnimation}
        >
          <CarImages>
            <ImageSlider imagesUrl={car.photos} />
          </CarImages>

        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollhandler}
        scrollEventThrottle={16} // animação de 60fps - 1000 milisegundos / 60 frames = 16,66666
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
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

        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
})