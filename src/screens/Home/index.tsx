import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import Logo from '../../assets/images/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { CarDTO } from '../../dtos/carDTO';
import api from '../../services/api';

export const Home = () => {
  const navigation = useNavigation<any>();
  const [cars, setCars] = useState<CarDTO[]>();
  const [loading, setLoading] = useState(false);

  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate('CarDetails', { car });
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/cars');
        setCars(data);
      } catch (error) {
        Alert.alert('Something went wrong', error as string);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading && <TotalCars>Total de {cars?.length} Carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
};
