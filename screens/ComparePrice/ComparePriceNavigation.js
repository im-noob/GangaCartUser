import React, { Component } from "react";

import {createStackNavigator } from 'react-navigation';
import MenuButton from "../../components/MenuButton";
import HeaderTitle from "../../components/HeaderTitle";
import ItemDetails from "./ItemDetails";
import ItemList from "./ItemList";
import CartNavigation from "../Cart/CartNavigation";
import RewardNavigation from "../Reward/RewardNavigation";

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
      ItemList:{
          screen: ItemList
      },
      dtt:{
          screen:RewardNavigation
      }
      
    },
    {
      
    }
  );