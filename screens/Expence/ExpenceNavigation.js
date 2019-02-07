import React, { Component } from "react";

import {createStackNavigator } from 'react-navigation';

import MenuButton from "../../components/MenuButton";
import HeaderTitle from "../../components/HeaderTitle";
import Home from "./Home";
import ExpenceList from "./ExpenceList";
import ExpenceDetails from "./ExpenceDetails";
import Feedback from "./Feedback";
export default createStackNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
          headerTitle: HeaderTitle,
          headerStyle: {
            backgroundColor: '#2874f0'
          },
          headerLeft: <MenuButton obj={navigation}  />,
        }),
      },
      ExpenceLilst:{
          screen:ExpenceList
      },
      ExpenceDetails:{
          screen:ExpenceDetails
      },
      FeedBack:{
          screen:Feedback
      }
    },
    {
      
    }
  );