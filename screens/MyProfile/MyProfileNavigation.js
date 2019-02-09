import React, { Component } from "react";

import {createStackNavigator } from 'react-navigation';
import MenuButton from "../../components/MenuButton";
import HeaderTitle from "../../components/HeaderTitle";
import Home from "./Home";
import EditProfile from "./EditProfile";
import RewardNavigation from "../Reward/RewardNavigation";
import ViewProfile from "./ViewProfile";
import MyOrderNavigation from "../MyOrder/MyOrderNavigation";
import CartButton from "../../components/CartButton";

export default createStackNavigator(
    {
      EditProfile: {
        screen: EditProfile,
        navigationOptions: ({ navigation }) => ({
          headerTitle: HeaderTitle,
          headerStyle: {
            backgroundColor: '#2874f0'
          },
          headerLeft: <MenuButton obj={navigation}  />,
          headerRight: <CartButton obj={navigation} value="10"  />,
          
        }),
      },
      Home:{
          screen: Home
      },
      RewardStack:{
          screen:RewardNavigation
      },
      ViewProfile:{
          screen: ViewProfile
      },
      MyOrderStack:{
          screen:MyOrderNavigation
      }
    },
    {
      
    }
  );