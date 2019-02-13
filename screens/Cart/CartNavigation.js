import React from "react";

import {createStackNavigator } from 'react-navigation';

import MenuButton from "../../components/MenuButton";
import HeaderTitle from "../../components/HeaderTitle";
import Order from "./Order";
import ConifirmOrder from "./ConifirmOrder";
import ComparePriceNavigation from "../ComparePrice/ComparePriceNavigation";
import CartButton from "../../components/CartButton";



  export default createStackNavigator(
    {
      OrderScreen: {
        screen: Order,
        navigationOptions: ({ navigation }) => ({
          headerTitle: HeaderTitle,
          headerStyle: {
            backgroundColor: '#2874f0'
          },
          headerLeft: <MenuButton obj={navigation}  />,
          headerRight: <CartButton obj={navigation} value="10"  />,
          
        }),
      },
      Conifirm:{
          screen:ConifirmOrder
      },
      ComparePriceStack:{
          screen:ComparePriceNavigation
      },
    

    },
    {
      
    }
  );