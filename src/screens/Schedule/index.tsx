import React from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native'

import { BackButton } from '../../components/BackButton'

import ArrowSvg from '../../assets/images/arrow.svg'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValueWrapper,
  DateValue,
  Content,
  Footer
} from './styles'
import { StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

export const Schedule = () => {
  const theme = useTheme();

  const navigation = useNavigation();


  const handleConfirmRental = () => {
    navigation.navigate('ScheduleDetails' as any);
  }

  const handleGoBackPage = () => {
    navigation.goBack()
  }

  return (
    <Container>
      <Header>
        <StatusBar 
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton 
          onPress={handleGoBackPage}
          color={theme.colors.shape}
        />
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValueWrapper selected={false}>
              <DateValue >18/06/2021</DateValue>
            </DateValueWrapper>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueWrapper selected={false}>
              <DateValue >18/06/2021</DateValue>
            </DateValueWrapper>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  )
}