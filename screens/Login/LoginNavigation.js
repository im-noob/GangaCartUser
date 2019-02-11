import React, { Component } from "react";

import {createStackNavigator } from 'react-navigation';

import MenuButton from "../../components/MenuButton";
import HeaderTitle from "../../components/HeaderTitle";
import LoginScreen from "./LoginScreen";
import CartButton from "../../components/CartButton";
import SignUPScreen from "./SingUP";
export default createStackNavigator(
    {
      LoginScreen: {
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
          headerTitle: HeaderTitle,
          headerStyle: {
            backgroundColor: '#2874f0'
          },
          headerLeft: <MenuButton obj={navigation}  />,
          headerRight: <CartButton obj={navigation} value="10"  />,
          
        }),
      },
      Login:{
        screen: LoginScreen
      },
      Singup:{
        screen:SignUPScreen
      }
    },
    {
      
    }
  );