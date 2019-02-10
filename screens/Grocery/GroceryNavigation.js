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
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions,createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import Category from "./Category";
import ItemDetails from "./ItemDetails";
import ItemList from "./ItemList";
import MenuButton from "../../components/MenuButton";
import HeaderTitle from "../../components/HeaderTitle";
import CartNavigation from "../Cart/CartNavigation";
import CartButton from "../../components/CartButton";
const {width,height} = Dimensions.get('window');

const StackNav =  createStackNavigator(
    {
      category: {
        screen: Category,
        navigationOptions: ({ navigation }) => ({
          headerTitle: HeaderTitle,
          headerStyle: {
            backgroundColor: '#2874f0'
          },
          headerLeft: <MenuButton obj={navigation}  />,
          headerRight: <CartButton obj={navigation} value="10"  />,
          
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
            headerTitle:"Item Details",
           headerStyle: {
             backgroundColor: '#2874f0'
           },
         }),
      }
    },
    {
      
    }
);



class ShoppingScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}


 

const TabNavigator = createBottomTabNavigator(
  {
      HomeStack: StackNav,
      Shopping: ShoppingScreen,
      Cart: CartNavigation,
  },
  {
    defaultNavigationOptions  : ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName='worker';
        if(routeName == 'HomeStack'){
            iconName =`home${focused?'':''}`;
        } else if (routeName === 'Shopping') {
            iconName = `shopping${focused ? '' : ''}`;
        } else if (routeName === 'Cart') {
            iconName = `cart${focused ? '' : ''}`;
        }
    
    
        return <Icon name={iconName} size={30} color={tintColor} style={{fontWeight:'900'}}/>;
      },
      
    }),
    tabBarOptions: {
        activeTintColor: '#0087e0',
        inactiveTintColor: '#747474',
        style:{backgroundColor: '#fff'},
        showLabel:false,
    },
        
    animationEnabled: false,
    swipeEnabled: true,
    initialRouteName :'HomeStack',

  },
);

export default createAppContainer(TabNavigator);
