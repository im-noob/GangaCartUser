import React, { Component } from "react";

import {createStackNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import MenuButton from "../../components/MenuButton";
import HeaderTitle from "../../components/HeaderTitle";
import Home from "./Home";
import OrderDetails from "./OrderDetails";
import CartButton from "../../components/CartButton";



export default createStackNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
          headerTitle: "History",
          headerStyle: {
            backgroundColor: '#2874f0'
          },
          headerLeft: <MenuButton obj={navigation}  />,
          headerRight: <CartButton obj={navigation} value="10"  />,
          
        }),
      },
      OrderDetails:{
          screen:OrderDetails,
          navigationOptions: ({ navigation }) => ({
            headerTitle: "History Details",
            headerStyle: {
              backgroundColor: '#2874f0'
            },
            headerRight: <CartButton obj={navigation} value="10"  />,
            
          }),
      }
    },
    {
      
    }
  );