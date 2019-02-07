import React from 'react';
import {StyleSheet,Text,View,ScrollView,Image,TouchableOpacity,Platform } from 'react-native';
import {createDrawerNavigator,DrawerItems, SafeAreaView,createStackNavigator,NavigationActions,createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import GangaCartPlusZoneScreen from '../screens/GangaCartPlusZoneScreen';
import GroceryScreen from '../screens/GroceryScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import ServiceScreen from '../screens/ServicesScreen';
import OfferZoneScreen from '../screens/OfferZoneScreen';
import MyOrderScreen from '../screens/MyOrderScreen';
import MyRewardScreen from '../screens/MyRewardScreen';
import MyCartScreen from '../screens/MyCartScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import ExampleScreenFirst from '../screens/ExampleScreenFirst';
import ExampleScreenSecond from '../screens/ExampleScreenSecond';
import ExampleScreenThird from '../screens/ExampleScreenThird';



const CustomDrawerContentComponent = (props) => (
  
	<SafeAreaView style={{flex:1,backgroundColor:'#0962f5'}} forceInset={{ top: 'always', horizontal: 'never' }}>
		<View style={{height:100, backgroundColor:'#0962f5',alignItems:'center',justifyContent:'center'}}>
			{/* <Image source={require('../assets/images/icon.png')} style={{height:120,width:120,borderRadius:60}}/> */}
		</View>
		
		<ScrollView style={{backgroundColor:'#FFF'}}>
			<DrawerItems {...props} />
		</ScrollView>
		
	</SafeAreaView>
  
);
class MenuButton extends React.Component{
	render(){
		return(
			<View style={{backgroundColor:"#2874f0"}}>
				<TouchableOpacity onPress={() => { this.props.obj.toggleDrawer() } }>
					<Icon name="menu" style={{color: 'white', padding: 10, marginLeft:5, fontSize: 35}}/>
				</TouchableOpacity>
			</View>
		);
	}
}
const HeaderTitle = (<Text style={{color:"#fff",padding: 10, marginLeft:5, fontSize: 20 , fontWeight:"400"}}>GangaCart</Text>);




// const ExampleScreenFirstStack = ({
//     : {
//       screen:ExampleScreenFirst,
//       
//     },
//     : {
//       screen:ExampleScreenSecond,
//     },
// });

// const ExampleScreenSecondStack = createStackNavigator(
//   {
    
//   },
// );


// const ExampleScreenFirstStack = createStackNavigator({
  
// });



const HomeScreenStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: HeaderTitle,
        headerStyle: {
          backgroundColor: '#2874f0'
        },
        headerLeft: <MenuButton obj={navigation}  />,
      }),
    },
    ExampleScreenFirst: {
      screen: ExampleScreenFirst,
      navigationOptions: ({ navigation }) => ({
        title: `First Screen`,
      }),
    },
    ExampleScreenSecond: {
      screen: ExampleScreenSecond,
      navigationOptions: ({ navigation }) => ({
        title: `Second Screen`,
      }),
    } ,
  
    ExampleThirdScreen: {
        screen:ExampleScreenThird,
        navigationOptions: ({ navigation }) => ({
          title: `Thired Screen`,
        }),
    }
    
  },
  {
    
  }
);


const GangaCartPlusZoneScreenStack = createStackNavigator(
  {
    HomeScreen: {
      screen: GangaCartPlusZoneScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: HeaderTitle,
        headerStyle: {
          backgroundColor: '#2874f0'
        },
        headerLeft: <MenuButton obj={navigation}  />,
      }),  
    }
  },
    
);
const GroceryScreenStack = createStackNavigator(
  {
    HomeScreen: {
      screen: GroceryScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: HeaderTitle,
        headerStyle: {
          backgroundColor: '#2874f0'
        },
        headerLeft: <MenuButton obj={navigation}  />,
      }),
    }
  },
  {
    
  }
);
const RestaurantScreenStack = createStackNavigator(
  {
    HomeScreen: {
      screen: RestaurantScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: HeaderTitle,
        headerStyle: {
          backgroundColor: '#2874f0'
        },
        headerLeft: <MenuButton obj={navigation}  />,
      }),
    }
  },
  {
    
  }
);
const ServicesScreenStack = createStackNavigator(
  {
    HomeScreen: {
      screen: ServiceScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: HeaderTitle,
        headerStyle: {
          backgroundColor: '#2874f0'
        },
        headerLeft: <MenuButton obj={navigation}  />,
      }),
    }
  },
  {
    
  }
);
const OfferZoneScreenStack = createStackNavigator(
  {
    HomeScreen: {
      screen: OfferZoneScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: HeaderTitle,
        headerStyle: {
          backgroundColor: '#2874f0'
        },
        headerLeft: <MenuButton obj={navigation}  />,
      }),
    }
  },
  {
    
  }
);
const MyOrdersScreenStack = createStackNavigator(
  {
    HomeScreen: {
      screen: MyOrderScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: HeaderTitle,
        headerStyle: {
          backgroundColor: '#2874f0'
        },
        headerLeft: <MenuButton obj={navigation}  />,
      }),
    }
  },
  {
    
  }
);
const MyRewardsScreenStack = createStackNavigator(
  {
    HomeScreen: {
      screen: MyRewardScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: HeaderTitle,
        headerStyle: {
          backgroundColor: '#2874f0'
        },
        headerLeft: <MenuButton obj={navigation}  />,
      }),
    }
  },
  {
    
  }
);
const MyCartScreenStack = createStackNavigator(
  {
    HomeScreen: {
      screen: MyCartScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: HeaderTitle,
        headerStyle: {
          backgroundColor: '#2874f0'
        },
        headerLeft: <MenuButton obj={navigation}  />,
      }),
    }
  },
  {
    
  }
);
const MyAccountScreenStack = createStackNavigator(
  {
    HomeScreen: {
      screen: MyAccountScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: HeaderTitle,
        headerStyle: {
          backgroundColor: '#2874f0'
        },
        headerLeft: <MenuButton obj={navigation}  />,
      }),
    }
  },
  {
    
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  
	Home:{
		screen:HomeScreenStack,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (<Icon name="home-outline" size={24} style={{ color: tintColor }} />),
		}
  },
  GangaCartPlusZone:{
		screen:GangaCartPlusZoneScreenStack,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (<Icon name="home-outline" size={24} style={{ color: tintColor }} />),
		}
  },
  Grocery:{
		screen:GroceryScreenStack,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (<Icon name="home-outline" size={24} style={{ color: tintColor }} />),
		}
  },
  Restaurant:{
		screen:RestaurantScreenStack,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (<Icon name="home-outline" size={24} style={{ color: tintColor }} />),
		}
  },
  Services:{
		screen:ServicesScreenStack,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (<Icon name="home-outline" size={24} style={{ color: tintColor }} />),
		}
  },
  OfferZone:{
		screen:OfferZoneScreenStack,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (<Icon name="home-outline" size={24} style={{ color: tintColor }} />),
		}
  },
  MyOrders:{
		screen:MyOrdersScreenStack,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (<Icon name="home-outline" size={24} style={{ color: tintColor }} />),
		}
  },
  MyRewards:{
		screen:MyRewardsScreenStack,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (<Icon name="home-outline" size={24} style={{ color: tintColor }} />),
		}
  },
  MyCart:{
		screen:MyCartScreenStack,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (<Icon name="home-outline" size={24} style={{ color: tintColor }} />),
		}
  },
  MyAccount:{
		screen:MyAccountScreenStack,
		navigationOptions: {
			drawerIcon: ({ tintColor }) => (<Icon name="home-outline" size={24} style={{ color: tintColor }} />),
		}
  },
	
},{
	contentComponent:CustomDrawerContentComponent,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const AppContainer = createAppContainer(AppDrawerNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;