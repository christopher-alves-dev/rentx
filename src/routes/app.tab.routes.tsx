import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "../screens/Home";
import { MyCars } from "../screens/MyCars";
import { AppStackRoutes } from "./app.stack.routes";

import HomeSvg from '../assets/images/home.svg';
import CarSvg from '../assets/images/car.svg';
import PeopleSvg from '../assets/images/people.svg';
import { useTheme } from "styled-components/native";
import { Platform } from "react-native";
import { Profile } from "../screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator();

export const AppTabRoutes = () => {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{ 
        headerShown: false, 
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.textDetail,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.backgroundPrimary,
        }
      }}

    >
      <Screen 
        name="HomeStack" 
        component={AppStackRoutes} 
        options={{
          tabBarIcon: (({ color }) => <HomeSvg width={24} height={24} fill={color} />)
        }}
      />

      <Screen 
        name="MyCars" 
        component={MyCars} 
        options={{
          tabBarIcon: (({ color }) => <CarSvg width={24} height={24} fill={color} />)
        }}
      />

      <Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: (({ color }) => <PeopleSvg width={24} height={24} fill={color} />)
        }}
      />
    </Navigator>
  );
};
