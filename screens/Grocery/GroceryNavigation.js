import React, { Component } from "react";
import {
    StyleSheet,
    WebView ,
    View,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
    ToastAndroid,
    NetInfo,
    Modal,
} from "react-native";
import { 
    Container,
    Spinner,
    Button,
    Text,
    Content,
    Header,
    Left,
    Right,
    Title,
    Body,
    Input,
    Card,
    CardItem,
    List,
    ListItem,
    Form,
    Picker,
    Item,
    Textarea,
    Label,
    Thumbnail,
} from 'native-base';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import Category from "./Category";
import ItemDetails from "./ItemDetails";
import ItemList from "./ItemList";
import MenuButton from "../../components/MenuButton";
import HeaderTitle from "../../components/HeaderTitle";
const {width,height} = Dimensions.get('window');

export default createStackNavigator(
    {
      category: {
        screen: Category,
        navigationOptions: ({ navigation }) => ({
           headerTitle:"Grocery",
          headerStyle: {
            backgroundColor: '#2874f0'
          },
          headerLeft: <MenuButton obj={navigation}  />,
        }),
      },
      ItemDetails:{
          screen: ItemDetails,
          navigationOptions: ({ navigation }) => ({
            headerTitle:"Item Details",
           headerStyle: {
             backgroundColor: '#2874f0'
           },
         }),
      },
      itemList:{
          screen:ItemList,
          navigationOptions: ({ navigation }) => ({
            headerTitle:"Item List",
           headerStyle: {
             backgroundColor: '#2874f0'
          },
        }),
      }
    },
    {
      
    }
);