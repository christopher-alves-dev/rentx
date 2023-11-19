import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import api from '../../services/api';
import theme from '../../styles/theme';

import { LoadAnimation } from '../../components/LoadAnimation';
import { SchedulesByUser } from '../../dtos/scheduleByUserDTO';
import {
  Appointments,
  AppointmentsQuantity,
  AppointmentsTitle,
  CarFooter,
  CarFooterDate,
  CarFooterPeriod,
  CarFooterTitle,
  CarWrapper,
  Container,
  Content,
  Header,
  Subtitle,
  Title,
} from './styles';

type CarProps = SchedulesByUser[]

export const MyCars = () => {
  const [cars, setCars] = useState<CarProps>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation()

  const handleGoBackPage = () => {
    navigation.goBack()
  }

  useFocusEffect(useCallback(() => {
    async function fetchCars() {
      try {
        const response = await api.get<SchedulesByUser[]>('/schedules_byuser?user_id=1')
        setCars(response.data.sort((a, b) => b.id - a.id))

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    fetchCars()
  }, []))

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

        <Subtitle>
          Conforto, segurança e praticidade
        </Subtitle>

        
      </Header>

      {loading 
        ? <LoadAnimation /> 
        : <Content>
            <Appointments>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>{cars?.length ?? 0}</AppointmentsQuantity>
            </Appointments>

            <FlatList 
              data={cars}
              keyExtractor={item => String(item.id)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CarWrapper>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign 
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{marginHorizontal: 10}}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}/>
          </Content>
      }
    </Container>
  );
};
