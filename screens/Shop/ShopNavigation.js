import React, { Component } from "react";

import {createStackNavigator } from 'react-navigation';

import MenuButton from "../../components/MenuButton";
import HeaderTitle from "../../components/HeaderTitle";
import ItemDetails from "./ItemDetails";
import ItemList from "./ItemList";
import ShopDetails from "./ShopDetails";
import ShopList from "./ShopList";

export default createStackNavigator(
    {
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
      ItemList: {
          screen: ItemList
      },
      ShopDetails: {
          screen:ShopDetails
      },
      ShopList: {
          screen:ShopList
      }
    },
    {
      
    }
  );