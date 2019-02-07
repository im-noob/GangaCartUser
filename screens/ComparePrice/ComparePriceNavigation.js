import React, { Component } from "react";

import {createStackNavigator } from 'react-navigation';
import MenuButton from "../../components/MenuButton";
import HeaderTitle from "../../components/HeaderTitle";
import ItemDetails from "./ItemDetails";
import ItemList from "./ItemList";
import Order from "../Cart/Order";
import ChangeOrder from "../Cart/ChangeOrder";
import CartNavigation from "../Cart/CartNavigation";


// const CartNavigation = createStackNavigator(
//   {
//     OrderScreen: {
//       screen: Order,
//       navigationOptions: ({ navigation }) => ({
//         headerTitle: HeaderTitle,
//         headerStyle: {
//           backgroundColor: '#2874f0'
//         },
//         headerLeft: <MenuButton obj={navigation}  />,
//       }),
//     },
//     ChnageOrder:{
//         screen:ChangeOrder
//     },
 

//   },
//   {
    
//   }
// );


export default createStackNavigator(
    {
      // CartNavigation:{
      //   screen:CartNavigation  Also Included due o parent
      // },
      ItemDetails: {
        screen: ItemDetails,
        navigationOptions: ({ navigation }) => ({
          headerTitle: HeaderTitle,
          headerStyle: {
            backgroundColor: '#2874f0'
          },
          headerLeft: <MenuButton obj={navigation}  />,
        }),
      },
      ItemList:{
          screen: ItemList                                                                                                                  
      },
      
    },
    {
      
    }
  );

